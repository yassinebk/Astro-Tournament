import {gql} from "@apollo/client"




export const PARTICIPANT_JOINED=gql`
subscription Subscription {
  participantJoined {
    username
    email
    id
    score
    level
  }
}
`

export const leaderBoardCheck=gql`
subscription Subscription {
  leaderboardCheck {
    username
    id
    score
  }
}
`;