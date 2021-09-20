import { gql } from "apollo-server-express";

const FieldErrorFragment = gql`
  fragment FieldError on FieldError {
    field
    message
  }
`;

export default FieldErrorFragment;
