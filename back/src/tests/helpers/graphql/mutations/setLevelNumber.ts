import { gql } from "apollo-server-core";
import OperationErrorFragment from "../fragments/OperationError";

const setLevelNumberMutation = gql`
  mutation setLevelNumber($levelId: String!, $number: Int!) {
    setLevelNumber(levelId: $levelId, number: $number) {
      error {
        ...OperationError
      }
      level {
        _id
        createdAt
        updatedAt
        number
      }
    }
  }
  ${OperationErrorFragment}
`;

export default setLevelNumberMutation;
