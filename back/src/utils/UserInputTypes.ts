import { Field, InputType } from "type-graphql";

@InputType()
export class UserLoginInfos {
  @Field()
  usernameOrEmail: string;

  @Field()
  password: string;
}

@InputType()
export class UserRegisterInfos {
  @Field()
  email: string;
  @Field()
  fullname: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
