import { gql } from "apollo-server-express";

const registerMutation = gql`
  mutation register($options: UserRegisterInfos!) {
    register(options: $options) {
      user {
        username
      }
      errors {
        field
        message
      }
    }
  }
`;

export default registerMutation;
