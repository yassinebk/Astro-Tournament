import { gql } from "apollo-server-express";

const allUsersQuery = gql`
  query allUsers {
    allUsers {
      createdAt
      score
      username
      levelNumber
    }
  }
`;
export default allUsersQuery;
