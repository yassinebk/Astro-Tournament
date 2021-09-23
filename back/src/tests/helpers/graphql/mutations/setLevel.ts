import { gql } from "apollo-server-express";
import OperationErrorFragment from "../fragments/OperationError";

const setLevelMutation = gql`
  mutation setLevel($levelId: String!, $userId: String!) {
    setLevel(levelId: $levelId, userId: $userId) {
      error {
        ...OperationError
      }
      value
    }
  }
  ${OperationErrorFragment}
`;

export default setLevelMutation;
