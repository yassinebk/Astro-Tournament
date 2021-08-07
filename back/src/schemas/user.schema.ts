import { gql } from "apollo-server-express";
import { User } from "../generated/graphql";

const User = gql`
  enum Role {
    ADMIN
    PLAYER
  }

  type Token {
    value: String
  }

  type LoginReturn {
    token: Token
    user: User
  }
  type User {
    username: String!
    email: String!
    id: ID!
    score: Int!
    password: String
    role: String!
    level: ID!
  }
`;

const UserSchema = {
  schema: User,
};

export default UserSchema;

