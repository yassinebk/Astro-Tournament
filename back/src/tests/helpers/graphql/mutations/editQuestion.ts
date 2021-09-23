import { gql } from "apollo-server-express";
import QuestionInfoFragment from "../fragments/QuestionInfo";

const editQuestionMutation = gql`
  mutation editQuestion($newInfos: editQuestionInfo!, $questionId: String!) {
    editQuestion(newInfos: $newInfos, questionId: $questionId) {
      error {
        message
        type
      }
      question {
        ...QuestionInfo
      }
    }
  }
  ${QuestionInfoFragment}
`;

export default editQuestionMutation;
