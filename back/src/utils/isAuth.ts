import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../types";
import { setError } from "./errorTypes";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.currentUser) {
    return setError("AuthorizationError", " permission denied : login First ");
  }
  return next();
};

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.currentUser) {
    console.log("here");
    return setError("AuthorizationError", " permission denied : login First ");
  }
  if (!(context.currentUser.role === "ADMIN")) {
    return setError(
      "PrivilegeError",
      "permission denied : you should be an admin"
    );
  }
  return next();
};
