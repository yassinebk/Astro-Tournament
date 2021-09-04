import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import {Questions} from "./Questions";

@ObjectType()
export class Level {
  @prop()
  @Field(() => ID)
  public _id: string;

  @prop({ type: Number, required: true, unique: true })
  @Field(() => Int, { nullable: false })
  public number: number;

  @prop({ ref: "Questions", default: [] })
  @Field(() => [Questions], { nullable: false })
  public Questions: Ref<Questions>[];
}

const LevelModel = getModelForClass(Level);

export default LevelModel;
