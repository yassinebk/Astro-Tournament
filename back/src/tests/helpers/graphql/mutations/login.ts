import { gql } from "apollo-server-express";
import QuestionInfoFragment from "../fragments/QuestionInfo";

const loginMutation = gql`
  mutation login($options: UserLoginInfos!) {
    login(options: $options) {
      user {
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
        level
        role
      }

      errors {
        field
        message
      }
      token
    }
  }
  ${QuestionInfoFragment}
`;

export default loginMutation;
