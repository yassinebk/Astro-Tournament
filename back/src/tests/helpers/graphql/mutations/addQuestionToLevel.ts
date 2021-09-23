import { gql } from "apollo-server-express";
import QuestionInfoFragment from "../fragments/QuestionInfo";

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
  ${QuestionInfoFragment}
`;

export default addQuestionToLevelMutation;
