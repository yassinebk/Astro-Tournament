import { gql } from "apollo-server-express";

const setLevelMutation = gql`
  mutation setLevel($levelId: String!, $userId: String!) {
    setLevel(levelId: $levelId, userId: $userId) {
      error {
        ...OperationError
      }
      value
    }
  }
`;

export default setLevelMutation;
