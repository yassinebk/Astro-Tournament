import { gql } from "apollo-server-express";

const OperationErrorFragment = gql`
  fragment OperationError on OperationError {
    type
    message
  }
`;

export default OperationErrorFragment;
