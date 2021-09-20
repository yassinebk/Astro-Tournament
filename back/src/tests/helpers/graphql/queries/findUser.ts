import { gql } from "apollo-server-core";

const findUser = gql`
  query findUser($userId: ID!) {
    findUser(userId: $userId) {
      _id
      username
      level
    }
  }
`;

export default findUser;
