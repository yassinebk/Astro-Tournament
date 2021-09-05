import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

export type errorTypes =
  | "AuthorizationError"
  | "IllegalActionError"
  | "404NOTFOUND"
  | "UnknownError"
  | "UserInputError"
  | "PrivilegeError";

@ObjectType()
export class OperationError {
  @Field()
  type: errorTypes;

  @Field()
  message: string;
}
