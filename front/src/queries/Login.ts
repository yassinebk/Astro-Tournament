import { gql } from "@apollo/client";



export const LOGIN = gql`
mutation Login ($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token {
      value
    }
    user {
      username
      id
      score
      role
      level
    }
  }
}
`;


export const REGISTER = gql`
mutation Register($role: Role!, $email: String!, $username: String!, $password: String!) {
  addUser(role: $role, email: $email, username: $username, password: $password) {
    username
    email
    score
    id
    password
    level
  }
}
`