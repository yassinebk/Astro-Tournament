import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { MyContext, token } from "../types";
import UserModel, { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import envs from "./utils/configs";
import connectToDb from "./utils/connect";

console.log(`Connecting to ${envs.MONGODB_URI}`);

connectToDb({ db: envs.MONGODB_URI ? envs.MONGODB_URI : "" });
mongoose.set("debug", true);

void (async function () {
  const app = express();
  app.use(cors());
  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    debug: true,
    context: async ({ req }): Promise<MyContext> => {
      const auth = req ? req.headers.authorization : null;
      console.log(auth);
      if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
        const decodedToken: token = jwt.verify(
          auth.substring(7),
          envs.JWT_SECRET_KEY as jwt.Secret
        ) as token;
        const currentUser: User | null = await UserModel.findById(
          decodedToken.id
        ).populate("level");

        console.log(currentUser);

        return { currentUser: currentUser, token: decodedToken };
      }
      return { currentUser: null, token: null };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () => {});
})();
