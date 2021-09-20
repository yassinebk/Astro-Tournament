import { gql } from "apollo-server-core";

const LevelInfoFragment = gql`
  fragment LevelInfo on Level {
    _id
    name
    number
    createdAt
    updatedAt
    Questions {
      question
      _id
      questionType
      answer
      choices
      points
      orderNumber
      createdAt
      updatedAt
    }
  }
`;

export default LevelInfoFragment;
