import { gql } from "apollo-server-core";
import LevelInfoFragment from "../fragments/LevelInfo";

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
  ${LevelInfoFragment}
`;
export default addLevelMutation;
