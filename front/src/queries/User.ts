import {gql} from "@apollo/client"



export const SET_LEVEL = gql`
mutation SetLevel($Level: ID!, $UserId: ID!) {
  setLevel(level: $Level, user_id: $UserId) {
    username
    score
    level
    id
  }
}
`

export const SET_ROLE = gql`
mutation SetRole($id: ID!, $Role: String!) {
  setRole(id: $id, role: $role) {
    level
H    role
    username
    id
  }
}
`

export const SET_SCORE = gql`
mutation SetScore($Id: ID!, $score: Int!) {
  setScore(id: $id, score: $score) {
    username
    score
    level
    id
  }
}
`

export const ALL_USERS = gql`
query Query($role: String!) {
  allUsers(role: $role) {
    username
    score
    id
    email
    password
    role
    level
  }
}
`;

export const FIND_USER = gql`
query Query($id: ID!) {
  findUser(id: $id) {
    username
    email
    id
    score
    role
    level
  }
}
`;


export const ME = gql`
query Query {
  me {
    username
    id
    score
    role
    level
  }
}
`

export const PARTICIPANTS_COUNT = gql`
query participantsCount {
  participantsCount
}
`
