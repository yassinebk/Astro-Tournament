import { gql } from "apollo-server-core";

const getLevelQuery = gql`
  query getLevel($levelId: String!) {
    getLevel(levelId: $levelId) {
      _id
      createdAt
      updatedAt
      number
      Questions {
        _id
        answer
        question
      }
    }
  }
`;

export default getLevelQuery;
