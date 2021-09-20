import { gql } from "apollo-server-express";

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
`;

export default addQuestionMutation;