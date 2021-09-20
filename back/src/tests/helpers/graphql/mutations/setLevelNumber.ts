import { gql } from "apollo-server-core";

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
`;

export default setLevelNumberMutation;
