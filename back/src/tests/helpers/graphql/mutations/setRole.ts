import { gql } from "apollo-server-express";

const setRoleMutation = gql`
  mutation setRole($setRoleRole: String!, $setRoleUserId: ID!) {
    setRole(role: $setRoleRole, userId: $setRoleUserId) {
      error {
        message
        type
      }
      value
    }
  }
`;

export default setRoleMutation;
