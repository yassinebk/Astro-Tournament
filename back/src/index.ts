import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import {  makeExecutableSchema } from "@graphql-tools/schema";
import envs from "./utils/configs";
import express from "express";
import Data from "./models/index";
import {  ApolloServer } from "apollo-server-express";
import mongoose  from "mongoose"
import { token } from "../types";
import { User } from "./generated/graphql";
import jwt from "jsonwebtoken";
import GQ from "./schemas"


console.log(`Connecting to ${envs.MONGODB_URI}`)
mongoose.connect(envs.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log(`connected to MongoDB at ${envs.MONGODB_URI}`))
  .catch(error => console.log(error));

mongoose.set("debug", true);

void (async function() {
  const app = express();

  const httpServer = createServer(app);

  
  const schema = makeExecutableSchema({
    typeDefs:GQ.schemas,
    resolvers:GQ.resolvers
  });

  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<any> => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
        const decodedToken:token = jwt.verify(auth.substring(7), envs.JWT_SECRET_KEY) as token;
        const currentUser: User = await Data.UserModel.findById(decodedToken.id).populate("level");
    return { currentUser };
      }
      return undefined;
    }
  });
  await server.start();
  server.applyMiddleware({ app });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );
  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
})();
