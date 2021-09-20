import { gql } from "apollo-server-express";

const answerQuestionMutation = gql`
  mutation answerQuestion($questionId: String!, $answer: String!) {
    answerQuestion(questionId: $questionId, answer: $answer) {
      value
      error {
        message
        type
      }
    }
  }
`;

export default answerQuestionMutation;
