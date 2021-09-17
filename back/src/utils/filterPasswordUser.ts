import { User, UserNoPassword } from "src/entities/User";

export const filterUserPassword = (user: User): UserNoPassword => {
  return {
    _id: user._id,
    answeredQuestions: user.answeredQuestions,
    role: user.role,
    level: user.level,
    email: user.email,
    createdAt: user.createdAt,
    fullname: user.fullname,
    updatedAt: user.updatedAt,
    lastLogin: user.lastLogin,
    score: user.score,
    username: user.username,
    currentQuestion: user.currentQuestion,
  };
};
