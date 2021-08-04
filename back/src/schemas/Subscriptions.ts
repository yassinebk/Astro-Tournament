import { gql } from "apollo-server-express";
import pubsub from "./constants";



const Subscriptions = gql`
type Subscription {
  participantJoined:User!
  leaderboardCheck:User!
}
`
const resolvers = {
  Subscription: {
    participantJoined: {subscribe: () => pubsub.asyncIterator(['USER_LIST_UPDATE'])},
    leaderboardCheck:{subscribe:()=> pubsub.asyncIterator(["USER_SCORE_UPDATE"])}
  }
  };

const SubscriptionSchema = {
  schema: Subscriptions,
  resolvers
}

export default SubscriptionSchema
