import { gql } from "apollo-server-core";

const deleteLevelMutation = gql`
  mutation deleteLevel($levelId: ID!) {
    deleteLevel(levelId: $levelId)
  }
`;

export default deleteLevelMutation;
