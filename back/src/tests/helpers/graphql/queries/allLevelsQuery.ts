import { gql } from "apollo-server-express";

const allLevelsQuery = gql`
  query allLevel {
    allLevels {
      name
      _id
      number
      createdAt
      Questions {
        questionType
        _id
        answer
        points
        question
        createdAt
        updatedAt
      }
    }
  }
`;

export default allLevelsQuery;
