import { gql } from "apollo-server-express";

const allUsersQuery = gql`
  query AllUsers {
    allUsers {
      createdAt
      score
      username
      levelNumber
      _id
      role
    }
  }
`;
export default allUsersQuery;
