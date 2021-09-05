import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Questions } from "./Questions";

@ObjectType()
export class Level {
  @prop()
  @Field(() => ID)
  public _id: string;

  @prop({ type: Number, unique: true })
  @Field(() => Int, { nullable: true })
  public number?: number;

  @prop({ ref: "Questions", default: [] })
  @Field(() => [Questions], { nullable: false })
  public Questions: Ref<Questions>[];

  @Field(() => Date, { nullable: true })
  public createdAt: Date;

  @Field(() => Date, { nullable: true })
  public updatedAt?: Date;
}

const LevelModel = getModelForClass(Level, {
  schemaOptions: { timestamps: true },
});

export default LevelModel;
