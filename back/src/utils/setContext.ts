import jwt from "jsonwebtoken";
import UserModel, { User } from "../entities/User";
import { MyContext } from "types";
import envs from "./configs";
import { Context, ContextFunction } from "apollo-server-core";

const setContext: Context | ContextFunction<any> = async ({
  req,
}): Promise<MyContext> => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
    const decodedToken: string = jwt.verify(
      auth.substring(7),
      envs.JWT_SECRET_KEY as jwt.Secret
    ) as string;
    //console.log("decodedToken", decodedToken);
    const currentUser: User | null = await UserModel.findById(decodedToken, {
      password: 0,
    }).populate("level", "currentQuestion");
    return { currentUser };
  }
  return { currentUser: null };
};

export default setContext;
