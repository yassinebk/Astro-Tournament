import * as argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "types";
import UserModel, { Role, User } from "../entities/User";
import { FieldError, OperationError } from "../utils/FieldError.type";
import { UserLoginInfos, UserRegisterInfos } from "../utils/UserInputTypes";
import { validateRegister } from "../utils/validateRegister";
import jwt from "jsonwebtoken";
import envs from "../utils/configs";
import { PrimiteReturnType } from "../utils/errorTypes";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class UserLoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}

@ObjectType()
class BooleanResponse implements PrimiteReturnType<Boolean> {
  @Field()
  error?: OperationError;

  @Field()
  value?: boolean;
}

@Resolver(User)
export class UserResolver {
  @Query(() => Number)
  async participantsCount(): Promise<number> {
    try {
      const participantsNumber = await UserModel.count({
        role: "PLAYER" as Role,
      });
      return participantsNumber;
    } catch (error) {
      return -1;
    }
  }

  @Query(() => [User], { defaultValue: [] })
  async allUsers(): Promise<User[]> {
    const allUsers = UserModel.find({});
    return allUsers;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegisterInfos
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    let user;
    const hashedPassword = await argon2.hash(options.password);
    try {
      user = await UserModel.create({
        ...options,
        password: hashedPassword,
        createdAt: new Date(),
        role: "PLAYER",
        updatedAt: new Date(),
        lastLogin: new Date(),
      });
    } catch (error) {
      if (error.code === 11000) {
        return {
          errors: [{ field: "form", message: "username  or email exists " }],
        };
      }
      console.log("error:", error.code);
    }

    return { user };
  }

  @Query(() => User)
  async findUser(
    @Arg("userId") userId: string,
    @Ctx() { currentUser }: MyContext
  ) {
    if (currentUser?.role === "ADMIN") {
      const user = await UserModel.findById(userId);
      if (!user) return null;
      else return user;
    }
    return null;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserLoginInfos,
    @Ctx() { currentUser }: MyContext
  ): Promise<UserLoginResponse> {
    if (currentUser) {
      return {
        errors: [{ field: "form", message: "you are already logged in !" }],
      };
    }
    const searchPrompt = options.usernameOrEmail.includes("@")
      ? { email: options.usernameOrEmail }
      : { username: options.usernameOrEmail };

    const user = await UserModel.findOne(searchPrompt);

    if (!user) {
      return {
        errors: [
          { field: "usernameOrEmail", message: "wrong username or email" },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "wrong password" }],
      };
    }

    const token = jwt.sign(user, envs.JWT_SECRET_KEY as string);

    return {
      token,
      user,
    };
  }

  @Mutation(() => BooleanResponse)
  async editRole(
    @Arg("userId") userId: string,
    @Arg("role") role: Role,
    @Ctx() { currentUser }: MyContext
  ): Promise<BooleanResponse> {
    if (!currentUser) {
      return {
        error: {
          type: "AuthorizationError",
          message: " permission denied : login First ",
        },
      };
    }
    if (currentUser.role !== "ADMIN") {
      return {
        error: {
          type: "IllegalActionError",
          message: "Permission Denied",
        },
      };
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return {
        error: {
          type: "404NOTFOUND",
          message: "User not found",
        },
      };
    }

    user.role = role;

    try {
      await user.save();
    } catch (error) {
      return {
        value: false,
      };
    }
    return { value: true };
  }
}
