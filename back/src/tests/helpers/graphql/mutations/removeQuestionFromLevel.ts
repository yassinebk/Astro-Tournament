import { gql } from "apollo-server-express";
import LevelInfoFragment from "../fragments/LevelInfo";
import OperationErrorFragment from "../fragments/OperationError";

const removeQuestionFromLevelMutation = gql`
  mutation removeQuestionFromLevel($questionId: ID!, $levelId: ID!) {
    removeQuestionFromLevel(questionId: $questionId, levelId: $levelId) {
      level {
        ...LevelInfo
      }
      error {
        ...OperationError
      }
    }
  }
  ${OperationErrorFragment}
  ${LevelInfoFragment}
`;

export default removeQuestionFromLevelMutation;
