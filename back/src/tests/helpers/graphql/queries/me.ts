import { gql } from "apollo-server-core";

const MeQuery = gql`
  query Me {
    me {
      user {
        email
        currentQuestion {
          _id

          questionType
          question
          points
        }
        answeredQuestions {
          _id
          questionType
          question
          answer
          choices
          points
          orderNumber
        }
        score
        createdAt
        lastLogin
        level
        role
        username
        fullname
        _id
      }
    }
  }
`;

export default MeQuery;
