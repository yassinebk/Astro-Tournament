import { UserRegisterInfos } from "../utils/UserInputTypes";
import { FieldError } from "./FieldError.type";

export const validateRegister = (
  options: UserRegisterInfos
): FieldError[] | null => {
  const errors: FieldError[] = [];
  const { username, email, password } = options;
  if (username.length <= 3)
    errors.push({
      field: "username",
      message: "username should be at least 3 characters long",
    });
  if (email.length <= 3 || !email.includes("@")) {
    errors.push({
      field: "email",
      message: "email might be invalid",
    });
  }

  console.log(password.length);
  if (password.length < 8) {
    errors.push({
      field: "password",
      message: "password should be at least 8 characters long",
    });
  }

  console.log(errors.length);

  const returnedErrors = errors.length === 0 ? null : errors;
  console.log(returnedErrors);
  return returnedErrors;
};
