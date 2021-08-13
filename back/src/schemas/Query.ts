import {
  AuthenticationError,
  ForbiddenError,
  gql,
  UserInputError,
} from "apollo-server-express";
import { Context } from "../../types";
import { User } from "../generated/graphql";
import Data from "../models";

const Query = gql`
  type Query {
    #User
    allUsers(role: String): [User!]!
    findUser(id: ID!): User!
    me: User
    participantsCount: Int!

    # Level
    allLevels: [Level]!
    getLevel(id: ID!): Level

    #Question
    getQuestions(id: ID!): [Questions!]!
    allQuestions: [Questions!]!
  }
`;

const resolvers = {
      Query: {

          /* Questions Query*/

         allQuestions: async () => {
             return await Data.QuestionModel.find({});
              },
          getQuestions: async (_, args) => {
            const Level = await Data.levelModel.findById(args.id).populate("questions");
            return Level.questions;
          },

          /*Levels Query*/

        allLevels: async () => {
            return await Data.levelModel.find({}).populate("questions");
        },

        getLevel: async (_,args) => {
            const level = await Data.levelModel.findById(args.id).populate("questions");
            if (!level) throw new ForbiddenError("Level Not FOUND 404");
            return level;
        },

        /*User Query*/

        participantsCount: async (_) => Data.UserModel.collection.countDocuments(),
        allUsers: async (_, args) => {
            if (!args.role) {
                const users = await Data.UserModel.find({});
                return users;
            }
            const users: User[] = await Data.UserModel.find({ role: args.role });
            if (!users)
                throw new AuthenticationError("Permission denied");
            return users;
        },
        findUser: async (_: any, args: { id: any; }) => {
            const user = await Data.UserModel.findById(args.id).populate("level");
            if (!user) throw new UserInputError("Invalid ID");
            return user;
        },
        me: (_, context: Context) => {
            return context.currentUser;
        },

    },

}

const QuerySchema = {
    schema: Query,
    resolvers
}

export default QuerySchema;
