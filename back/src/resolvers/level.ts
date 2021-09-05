import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import LevelModel, { Level } from "../entities/Level";
import QuestionModel from "../entities/Questions";
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
        const level = new LevelModel({ number: newLevel.number });
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
    @Arg("questionId") questionId: string
  ): Promise<CrudLevelResponse> {
    const level = await LevelModel.findById(levelId);

    if (!level) {
      return setError("404NOTFOUND", "Level Not found");
    }
    if (level.Questions.includes(questionId)) {
      return setError(
        "IllegalActionError",
        "The question already exists in the level"
      );
    }
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return setError("404NOTFOUND", "Question Not found");
    }
    level.Questions = level.Questions.concat(questionId);
    await level.save();
    await level.populate("Questions");
    return { level };
  }
}

export default LevelResolver;
