import { gql } from "apollo-server-express";

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
`;

export default editQuestionMutation;
