import { gql } from "apollo-server-core";

const addLevelMutation = gql`
  mutation addLevel($addLevelOptions: NewLevelInput!) {
    addLevel(options: $addLevelOptions) {
      error {
        field
        message
      }
      level {
        ...LevelInfo
      }
    }
  }
`;
export default addLevelMutation;
