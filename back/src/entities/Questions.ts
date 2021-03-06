import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";

export enum QUESTION_TYPE {
  MULTIA = "MULTIANSWERS",
  ANSWER = "ANSWER",
}

registerEnumType(QUESTION_TYPE, { name: "QUESTION_TYPE" });

@ObjectType()
export class Questions {
  @Field(() => ID)
  public _id: string;

  @prop({ enum: QUESTION_TYPE })
  @Field(() => QUESTION_TYPE)
  public questionType: QUESTION_TYPE;

  @prop()
  @Field(() => String)
  question: string;

  @prop()
  @Field(() => String, { nullable: false })
  answer: string;

  @prop({ type: [String] })
  @Field(() => [String], { nullable: true, defaultValue: [] })
  choices?: string[];

  @prop({ type: Number })
  @Field(() => Int, { defaultValue: 100 })
  points: number;

  @prop({ type: Number })
  @Field(() => Int, { defaultValue: 0 })
  orderNumber: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt?: Date;
}

const QuestionModel = getModelForClass(Questions, {
  schemaOptions: { timestamps: true },
});

export default QuestionModel;
