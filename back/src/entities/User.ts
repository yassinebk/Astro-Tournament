import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import { Level } from "./Level";
import { Questions } from "./Questions";

export enum Role {
  ADMIN = "ADMIN",
  PLAYER = "PLAYER",
}
registerEnumType(Role, { name: "Role" });

@ObjectType()
export class User {
  @Field(() => ID)
  public _id: string;

  @prop()
  @Field({ nullable: true })
  public fullname?: string;

  @prop({ required: true, unique: true })
  @Field()
  public username: string;

  @prop({ required: true, unique: true })
  @Field()
  public email: string;

  @prop({ required: true })
  @Field()
  public password: string;

  @prop({ enum: Role, required: true })
  @Field(() => Role)
  public role: Role;

  @prop({ ref: "Level", autopopulate: true })
  @Field(() => ID, { nullable: true })
  level: Ref<Level>;

  @prop({ ref: "Questions", default: [] })
  @Field(() => [Questions])
  answeredQuestions: Ref<Questions>[];

  @prop({ type: () => Number, default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  public score: number;

  @prop({ type: () => Date })
  @Field(() => Date)
  createdAt: Date;

  @prop({ type: () => Date })
  @Field(() => Date, { nullable: true })
  public updatedAt: Date | null;

  @prop({ type: () => Date })
  @Field(() => Date, { nullable: true })
  public lastLogin: Date | null;
}

const UserModel = getModelForClass(User);

export default UserModel;
