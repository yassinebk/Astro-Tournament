import { gql } from "apollo-server-express";

const UserNoPasswordFragment = gql`
  fragment UserNoPassword on User {
    currentQuestion {
      ...QuestionInfo
    }
    answeredQuestions {
      ...QuestionInfo
    }
    email
    score
    createdAt
    lastLogin
    role
    username
    fullname
    _id
    level {
      ...LevelInfo
    }
    role
  }
`;

export default UserNoPasswordFragment;
