import QuestionInfoFragment from "./QuestionInfo";

const LevelInfoFragment = `
  fragment LevelInfo on Level {
    _id
    name
    number
    createdAt
    updatedAt
    Questions {
      ...QuestionInfo
    }
  }
  ${QuestionInfoFragment}
`;

export default LevelInfoFragment;
