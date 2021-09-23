import { gql } from "apollo-server-express";

const allUsersQuery = gql`
  query AllUsers {
    allUsers {
      createdAt
      score
      username
      levelNumber
    }
  }
`;
export default allUsersQuery;
