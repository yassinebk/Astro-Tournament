import { gql } from "apollo-server-express";

const allQuestionsQuery = gql`
  query allQuestions {
    allQuestions {
      _id
      answer
      question
      createdAt
      points
      updatedAt
    }
  }
`;


export default allQuestionsQuery;