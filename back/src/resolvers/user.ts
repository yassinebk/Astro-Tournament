import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "types";
import LevelModel, { Level } from "../entities/Level";
import UserModel, { Role, User, UserNoPassword } from "../entities/User";
import envs from "../utils/configs";
import { setError } from "../utils/errorTypes";
import { FieldError } from "../utils/FieldError.type";
import { isAdmin, isAuth } from "../utils/isAuth";
import BooleanResponse from "../utils/ResponseTypes";
import { UserLoginInfos, UserRegisterInfos } from "../utils/UserInputTypes";
import { validateRegister } from "../utils/validateRegister";
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

  @Field(() => UserNoPassword, { nullable: true })
  user?: UserNoPassword;

  @Field(() => String, { nullable: true })
  token?: string;
}

@ObjectType()
class MeResponse {
  @Field(() => UserNoPassword, { nullable: true })
  user?: UserNoPassword;
}

@ObjectType()
class UserBasicInfo {
  @Field()
  score: number;

  @Field()
  username: string;

  @Field(() => Int, { nullable: true })
  levelNumber?: number | null;

  @Field()
  createdAt: Date;
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

  @Query(() => [UserBasicInfo], { defaultValue: [] })
  async allUsers(): Promise<UserBasicInfo[]> {
    const allUsers = await UserModel.find({}, { password: 0 }).populate(
      "level"
    );

    console.log("UserList", allUsers);
    await setTimeout(() => console.log("waiting"), 10000);

    if (!allUsers) return [];
    const returnedUserList = allUsers.map((u) => {
      const user = {
        username: u.username,
        score: u.score,
        createdAt: u.createdAt,
        levelNumber: (u?.level as Level).number,
      };

      return user;
    });
    console.log("returnedUserList", returnedUserList);
    return returnedUserList;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegisterInfos
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      console.log("error", errors);
      return { errors };
    }
    let user;
    const hashedPassword = await argon2.hash(options.password);
    try {
      user = await UserModel.create({
        ...options,
        password: hashedPassword,
        role: "PLAYER",
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

  @Query(() => UserNoPassword, { nullable: true })
  async findUser(@Arg("userId") userId: string) {
    const user = await UserModel.findById({ _id: userId });
    if (!user) return null;
    else {
      const returnUser: UserNoPassword = {
        _id: user._id,
        answeredQuestions: user.answeredQuestions,
        role: user.role,
        level: user.level,
        email: user.email,
        createdAt: user.createdAt,
        fullname: user.fullname,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
        score: user.score,
        username: user.username,
      };

      return returnUser;
    }
  }

  @Mutation(() => UserLoginResponse)
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
    const valid = await argon2.verify(
      user.password as string,
      options.password
    );
    if (!valid) {
      return {
        errors: [{ field: "password", message: "wrong password" }],
      };
    }
    user.lastLogin = new Date();
    await user.save();

    console.log(user);
    const userJSON = user.toJSON();
    console.log("userJSON", userJSON);
    const token = jwt.sign(
      userJSON._id.toString(),
      envs.JWT_SECRET_KEY as string,
      {}
    );
    console.log("return User", user);
    const returnUser: UserNoPassword = {
      _id: user._id,
      answeredQuestions: user.answeredQuestions,
      role: user.role,
      level: user.level,
      email: user.email,
      createdAt: user.createdAt,
      fullname: user.fullname,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
      score: user.score,
      username: user.username,
    };

    return {
      token,
      user: returnUser,
    };
  }

  @Mutation(() => BooleanResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async editRole(
    @Arg("userId") userId: string,
    @Arg("role") role: Role
  ): Promise<BooleanResponse> {
    const user = await UserModel.findById(userId);

    if (!user) {
      return setError("404NOTFOUND", "User not found");
    }
    user.role = role;

    try {
      await user.save();
    } catch (error) {
      return {
        value: false,
        error: {
          message: error.message,
          type: "UnknownError",
        },
      };
    }
    return { value: true };
  }

  @Mutation(() => BooleanResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async setScore(
    @Arg("userId") userId: string,
    @Arg("score", () => Int) score: number
  ): Promise<BooleanResponse> {
    const user = await UserModel.findById(userId, { password: 0 });
    if (!user) {
      return setError("404NOTFOUND", "user not found");
    }

    user.score = score;
    try {
      await user.save();
    } catch (error) {
      return setError("UnknownError", error.message);
    }

    return {
      value: true,
    };
  }

  @Mutation(() => BooleanResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async setLevel(
    @Arg("userId") userId: string,
    @Arg("levelId") levelId: string
  ): Promise<BooleanResponse> {
    const user = await UserModel.findById(userId);
    if (!user) {
      return setError("404NOTFOUND", "user not found");
    }
    const level = await LevelModel.findById(levelId);
    if (!level) {
      return setError("404NOTFOUND", "level not found");
    }
    user.level = levelId;
    try {
      await user?.save();
    } catch (error) {
      return setError("UnknownError", error.message);
    }
    return {
      value: true,
    };
  }

  @Mutation(() => BooleanResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async setRole(
    @Arg("userId") userId: string,
    @Arg("role") role: Role
  ): Promise<BooleanResponse> {
    const user = await UserModel.findById(userId);
    if (!user) return setError("404NOTFOUND", "User not found");
    user.role = role;
    try {
      await user.save();
    } catch (error) {
      return setError("UnknownError", error.message);
    }
    return {
      value: true,
    };
  }

  @Query(() => MeResponse, { nullable: true })
  async me(@Ctx() { currentUser }: MyContext) {
    if (!currentUser) return null;
    return { user: currentUser };
  }
}
