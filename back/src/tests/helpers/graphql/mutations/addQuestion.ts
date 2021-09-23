import { gql } from "apollo-server-express";
import QuestionInfoFragment from "../fragments/QuestionInfo";

const addQuestionMutation = gql`
  mutation addQuestion($options: NewQuestionInfo!) {
    addQuestion(options: $options) {
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

export default addQuestionMutation;
