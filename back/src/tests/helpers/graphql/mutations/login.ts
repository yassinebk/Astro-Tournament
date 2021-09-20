import { gql } from "apollo-server-express";

const loginMutation = gql`
  mutation login($option: UserLoginInfos!) {
    login(options: $option) {
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
        level
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
`;

export default loginMutation;
