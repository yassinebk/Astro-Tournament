import { gql } from "apollo-server-express";






const Level = gql`
type Level {
  number:Int!
  questions:[Questions!]!
  id:ID
}
`

const LevelSchema = {
    schema: Level,
}

export default LevelSchema