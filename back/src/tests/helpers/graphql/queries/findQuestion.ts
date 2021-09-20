import { gql } from "apollo-server-express";

const findQuestionQuery = gql`
  query findQuestion($questionId: String!) {
    findQuestion(questionId: $questionId) {
      error {
        message
        type
      }
      question {
        answer
        choices
        createdAt
        updatedAt
        points
        question
        questionType
      }
    }
  }
`;

export default findQuestionQuery;
