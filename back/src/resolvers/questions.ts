import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "types";
import QuestionModel, { Questions, QUESTION_TYPE } from "../entities/Questions";
import UserModel from "../entities/User";
import { setError } from "../utils/errorTypes";
import { OperationError } from "../utils/FieldError.type";
import { isAdmin, isAuth } from "../utils/isAuth";
import BooleanResponse from "../utils/ResponseTypes";

@ObjectType()
class CrudQuestionResponse {
  @Field({ nullable: true })
  question?: Questions;

  @Field({ nullable: true })
  error?: OperationError;
}

@InputType()
class NewQuestionInfo {
  @Field(() => QUESTION_TYPE, { nullable: false })
  questionType: QUESTION_TYPE;

  @Field()
  question: string;

  @Field({ nullable: false })
  answer: string;

  @Field(() => [String], { nullable: true })
  choices?: string[];

  @Field(() => Int)
  points: number;
}

@InputType()
class editQuestionInfo {
  @Field(() => QUESTION_TYPE, { nullable: true })
  questionType?: QUESTION_TYPE;

  @Field({ nullable: true })
  answer?: string;

  @Field(() => [String], { nullable: true })
  choices?: string[];

  @Field(() => Int, { nullable: true })
  points?: number;
}

@Resolver(Questions)
class QuestionsResolver {
  @Query(() => [Questions])
  async allQuestions(): Promise<Questions[]> {
    const questions = await QuestionModel.find({});
    return questions;
  }

  @Query(() => CrudQuestionResponse)
  async findQuestion(
    @Arg("questionId") questionId: string
  ): Promise<CrudQuestionResponse> {
    const question = await QuestionModel.findById(questionId);
    if (!question) return setError("404NOTFOUND", "Question not found");

    return { question };
  }

  @Mutation(() => CrudQuestionResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async addQuestion(
    @Arg("options") questionInfo: NewQuestionInfo
  ): Promise<CrudQuestionResponse> {
    if (
      questionInfo.questionType === "MULTIANSWERS" &&
      (!questionInfo.choices || questionInfo.choices.length === 0)
    ) {
      return setError(
        "UserInputError",
        "choices should be provided for multiple answers"
      );
    }
    if (questionInfo.answer.length === 0) {
      return setError("UserInputError", "Answer should be provided");
    }
    try {
      console.log(questionInfo);
      const newQuestion = new QuestionModel(questionInfo);
      console.log(newQuestion);
      await newQuestion.save();

      return { question: newQuestion };
    } catch (error) {
      return setError("UnknownError", error.message);
    }
  }

  @Mutation(() => BooleanResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async deleteQuestion(
    @Arg("questionId", () => ID) questionId: string
  ): Promise<BooleanResponse> {
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }
    await QuestionModel.findByIdAndDelete(question);
    return { value: true };
  }

  @Mutation(() => CrudQuestionResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async editQuestion(
    @Arg("questionId") questionId: string,
    @Arg("newInfos") newInfos: editQuestionInfo
  ): Promise<CrudQuestionResponse> {
    try {
      if (newInfos.choices && newInfos.choices.length > 0) {
        newInfos.questionType = "MULTIANSWERS" as QUESTION_TYPE;
      }
      const question = await QuestionModel.findByIdAndUpdate(
        questionId,
        newInfos,
        { new: true }
      );

      if (!question)
        throw new Error("Unknown Error happned whwen updatig question");

      return { question };
    } catch (error) {
      return setError("UnknownError", error.message);
    }
  }

  @Mutation(() => BooleanResponse)
  @UseMiddleware(isAuth)
  async answerQuestion(
    @Arg("answer") answer: string,
    @Arg("questionId") questionId: string,
    @Ctx() { currentUser }: MyContext
  ): Promise<BooleanResponse> {
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return setError("404NOTFOUND", "Question not found");
    }
    if (question.answer === answer) {
      const user = await UserModel.findById(currentUser!._id);
      if (!user) {
        return {
          error: {
            type: "404NOTFOUND",
            message: "User was not found",
          },
        };
      }
      user.score += question.points;
      user.currentQuestion = question._id;
      await user.save();
      return { value: true };
    }
    return { value: false };
  }
}

export default QuestionsResolver;
