import LevelInfoFragment from "./LevelInfo";
import QuestionInfoFragment from "./QuestionInfo";

const UserNoPasswordFragment = `
  fragment UserNoPassword on User {
    currentQuestion {
      ...QuestionInfo
    }
    answeredQuestions {
      ...QuestionInfo
    }
    email
    score
    createdAt
    lastLogin
    role
    username
    fullname
    _id
    level {
      ...LevelInfo
    }
    role
  }
  ${LevelInfoFragment}
  ${QuestionInfoFragment}
`;

export default UserNoPasswordFragment;
