import { ObjectType, Field } from "type-graphql";
import { PrimitiveRetunType } from "./errorTypes";
import { OperationError } from "./FieldError.type";

@ObjectType()
class BooleanResponse implements PrimitiveRetunType<Boolean> {
  @Field({ nullable: true })
  error?: OperationError;

  @Field({ nullable: true })
  value?: boolean;
}

export default BooleanResponse;
