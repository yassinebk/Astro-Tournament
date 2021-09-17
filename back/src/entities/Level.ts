import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Questions } from "./Questions";

@ObjectType()
export class Level {
  @Field(() => ID)
  public _id: string;

  @prop({ type: Number, unique: true })
  @Field(() => Int, { nullable: true })
  public number?: number;

  @prop({ ref: "Questions", default: [], autopopulate: true })
  @Field(() => [Questions], { nullable: false })
  public Questions: Ref<Questions>[];

  @prop()
  @Field(() => String, { nullable: false })
  public name:string

  @Field(() => Date, { nullable: true })
  public createdAt: Date;

  @Field(() => Date, { nullable: true })
  public updatedAt?: Date;
}

const LevelModel = getModelForClass(Level, {
  schemaOptions: { timestamps: true },
});

export default LevelModel;
