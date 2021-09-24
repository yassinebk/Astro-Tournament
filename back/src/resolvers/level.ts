import {
  Arg,
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
import LevelModel, { Level } from "../entities/Level";
import QuestionModel, { Questions } from "../entities/Questions";
import { setError } from "../utils/errorTypes";
import { FieldError, OperationError } from "../utils/FieldError.type";
import { isAdmin, isAuth } from "../utils/isAuth";

@ObjectType()
class AddLevelResponse {
  @Field({ nullable: true })
  level?: Level;

  @Field({ nullable: true })
  error?: FieldError;
}

@ObjectType()
class CrudLevelResponse {
  @Field({ nullable: true })
  level?: Level;

  @Field({ nullable: true })
  error?: OperationError;
}

@InputType()
class NewLevelInput {
  @Field({ defaultValue: 999 })
  number: number;

  @Field({ nullable: true })
  levelPictureUrl: string;

  @Field(() => String, { nullable: false })
  name: string;
}

@Resolver(Level)
class LevelResolver {
  @Query(() => [Level], { nullable: false })
  async allLevels() {
    const levels = LevelModel.find({}).populate("Questions");
    return levels;
  }

  @Query(() => Level, { nullable: true })
  async getLevel(@Arg("levelId") levelId: string) {
    return LevelModel.findById(levelId);
  }

  @Mutation(() => AddLevelResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async addLevel(
    @Arg("options") newLevel: NewLevelInput
  ): Promise<AddLevelResponse> {
    const checkLevelUnique = await LevelModel.findOne({
      number: newLevel.number,
    });

    try {
      if (checkLevelUnique)
        return {
          error: {
            field: "number",
            message: "there is already a level taking that number",
          },
        };
      else {
        const level = new LevelModel({
          levelPictureUrl: newLevel.levelPictureUrl,
          number: newLevel.number,
          name: newLevel.name,
        });
        await level.save();

        if (!level) {
          return {
            error: {
              field: "form",
              message: "error has happened",
            },
          };
        }
        return { level };
      }
    } catch (error) {
      return {
        error: {
          field: "form",
          message: error.message,
        },
      };
    }
  }

  @Mutation(() => CrudLevelResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async setLevelNumber(
    @Arg("number", () => Int) number: number,
    @Arg("levelId") levelId: string
  ): Promise<CrudLevelResponse> {
    const oldLevelNumber = await LevelModel.findOne({ number: number });

    const level = await LevelModel.findById(levelId);

    if (!level) {
      return setError("404NOTFOUND", "Level not found");
    }

    if (oldLevelNumber && level) {
      if (level.id === oldLevelNumber.id) {
        return setError("UserInputError", "the level already has this number");
      }
      return setError(
        "UserInputError",
        "There exists another level with that number "
      );
    }

    level.number = number;
    await level.save();

    return { level };
  }

  @Mutation(() => CrudLevelResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async addQuestionToLevel(
    @Arg("levelId") levelId: string,
    @Arg("questionId") questionId: string,
    @Arg("orderNumber", () => Int, { nullable: true }) orderNumber: number
  ): Promise<CrudLevelResponse> {
    const level = await LevelModel.findById(levelId).populate("Questions");
    if (!level) {
      return setError("404NOTFOUND", "Level Not found");
    }

    const questionsId = level.Questions!.map((q) => (q as Questions)._id);
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return setError("404NOTFOUND", "Question Not found");
    }
    if (questionsId.includes(questionId)) {
      return setError(
        "IllegalActionError",
        "The question already exists in the level"
      );
    }
    if (
      level.Questions.map((q) => (q as Questions).orderNumber).includes(
        orderNumber
      )
    ) {
      return setError(
        "IllegalActionError",
        "Illegal Action a question in the same order already exists"
      );
    }

    level.Questions = level.Questions.concat(questionId);
    await level.save();
    await level.populate("Questions");
    return { level };
  }

  @Mutation(() => CrudLevelResponse)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async removeQuestionFromLevel(
    @Arg("levelId", () => ID, { nullable: false }) levelId: string,
    @Arg("questionId", () => ID, { nullable: false }) questionId: string
  ): Promise<CrudLevelResponse> {
    const level = await LevelModel.findById(levelId);

    if (!level) {
      return setError("404NOTFOUND", "Level Not found");
    }

    const questionsId = level.Questions!.map((q) => (q as Questions)._id);
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return setError("404NOTFOUND", "Question Not found");
    }
    if (!questionsId.includes(questionId)) {
      return setError(
        "IllegalActionError",
        "The question the level doesn't have the question"
      );
    }

    level.Questions = level.Questions.filter((q) => q !== questionId);
    await level.save();
    await level.populate("Questions");
    return { level };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async deleteLevel(@Arg("levelId", () => ID) levelId: string) {
    try {
      await LevelModel.findByIdAndDelete(levelId);
    } catch (error) {
      return false;
    }
    return true;
  }
}

export default LevelResolver;
