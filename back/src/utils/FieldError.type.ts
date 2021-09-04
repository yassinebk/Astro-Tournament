import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

type errorTypes =
  | "AuthorizationError"
  | "IllegalActionError"
  | "404NOTFOUND"
  | "UnknownError"
  | "UserInputError";

@ObjectType()
export class OperationError {
  @Field()
  type: errorTypes;

  @Field()
  message: string;
}
