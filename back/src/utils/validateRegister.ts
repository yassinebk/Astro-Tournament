import { UserRegisterInfos } from "../utils/UserInputTypes";

export const validateRegister = (options: UserRegisterInfos) => {
  const { username, email, password } = options;
  if (username.length <= 3)
    return [
      {
        field: "username",
        message: "username should be at least 3 characters long",
      },
    ];
  if (email.length <= 3 || !email.includes("@")) {
    return [
      {
        field: "email",
        message: "email might be invalid",
      },
    ];
  }

  if (password.length < 8) {
    return [
      {
        field: "password",
        message: "password should be at least 8 characters long",
      },
    ];
  }

  return null;
};
