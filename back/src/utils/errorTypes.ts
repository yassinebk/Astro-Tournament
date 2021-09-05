import { errorTypes, OperationError } from "./FieldError.type";
export interface PrimitiveRetunType<T> {
  error?: {
    message: string;
    type: errorTypes;
  };
  value?: T;
}
interface ReturnType {
  error: OperationError;
}

export const setError = (type: errorTypes, message: string): ReturnType => {
  return {
    error: {
      message,
      type,
    },
  };
};
