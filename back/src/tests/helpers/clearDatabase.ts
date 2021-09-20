import LevelModel from "../../entities/Level";
import QuestionModel from "../../entities/Questions";
import UserModel from "../../entities/User";

export const clearDatabase = async () => {
  await UserModel.deleteMany({});
  await QuestionModel.deleteMany({});
  await LevelModel.deleteMany({});

  console.log("database cleared");
};
