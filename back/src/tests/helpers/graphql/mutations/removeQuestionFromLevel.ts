import { gql } from "apollo-server-express";

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
`;

export default removeQuestionFromLevelMutation;
