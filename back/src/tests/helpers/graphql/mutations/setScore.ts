import { gql } from "apollo-server-express";

const setScoreMutation = gql`
  mutation setScore($score: Int!, $id: ID!) {
    setScore(score: $score, userId: $id) {
      error {
        message
        type
      }
      value
    }
  }
`;

export default setScoreMutation;