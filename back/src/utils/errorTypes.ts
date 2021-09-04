
type errorTypes =
  | "AuthorizationError"
  | "IllegalActionError"
  | "404NOTFOUND"
  | "UnknownError"
  | "UserInputError";

export interface PrimiteReturnType<T> {
  error?: {
    message: string;
    type: errorTypes;
  };
  value?: T;
}
