import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import { buildSchema } from "type-graphql";
import { MyContext } from "../types";
import UserModel, { User } from "./entities/User";
import LevelResolver from "./resolvers/level";
import QuestionsResolver from "./resolvers/questions";
import { UserResolver } from "./resolvers/user";
import envs from "./utils/configs";
import connectToDb from "./utils/connect";

console.log(`Connecting to ${envs.MONGODB_URI}`);

connectToDb({ db: envs.MONGODB_URI ? envs.MONGODB_URI : "" });
//mongoose.set("debug", true);

void (async function () {
  const app = express();

  app.use(
    cors({
      origin: envs.CORS_ORIGIN,
      credentials: true,
    })
  );

  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, LevelResolver, QuestionsResolver],
      validate: false,
    }),
    debug: true,
    context: async ({ req }): Promise<MyContext> => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
        const decodedToken: string = jwt.verify(
          auth.substring(7),
          envs.JWT_SECRET_KEY as jwt.Secret
        ) as string;
        //console.log("decodedToken", decodedToken);
        const currentUser: User | null = await UserModel.findById(
          decodedToken,
          { password: 0 }
        ).populate("level");

        //console.log(currentUser);

        return { currentUser };
      }
      return { currentUser: null };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  const PORT = 4000;
  httpServer.listen(PORT, () => {});
})();
