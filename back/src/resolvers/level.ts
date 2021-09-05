import LevelModel, { Level } from "../entities/Level";
import QuestionModel from "../entities/Questions";
import { setError } from "../utils/errorTypes";
import { FieldError, OperationError } from "../utils/FieldError.type";
import { isAdmin, isAuth } from "../utils/isAuth";
import BooleanResponse from "../utils/ResponseTypes";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

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
    const levels = LevelModel.find({});
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
        return { level: await LevelModel.create({ createdAt: new Date() }) };
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

  @Mutation(() => Level)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async setLevelNumber(
    @Arg("number") number: number,
    @Arg("levelId") levelId: string
  ): Promise<BooleanResponse> {
    const oldLevelNumber = await LevelModel.findOne({ number: number });

    if (oldLevelNumber) {
      return setError(
        "UserInputError",
        "There exists another level with that number"
      );
    }
    const level = await LevelModel.findById(levelId);

    if (!level) {
      return setError("404NOTFOUND", "Level not found");
    }
    level.number = number;
    level.updatedAt = new Date();
    await level.save();

    return { value: true };
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
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return setError("404NOTFOUND", "Question Not found");
    }
    level.Questions = level.Questions.concat(questionId);
    level.updatedAt = new Date();
    level.save();
    return { level };
  }
}

export default LevelResolver;
