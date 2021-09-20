import { gql } from "apollo-server-express";

const addQuestionToLevelMutation = gql`
  mutation addQuestionToLevel(
    $questionId: String!
    $levelId: String!
    $orderNumber: Int
  ) {
    addQuestionToLevel(
      questionId: $questionId
      levelId: $levelId
      orderNumber: $orderNumber
    ) {
      error {
        message
        type
      }
      level {
        _id
        updatedAt
        createdAt
        name
        number
        Questions {
          ...QuestionInfo
        }
      }
    }
  }
`;


export default addQuestionToLevelMutation;