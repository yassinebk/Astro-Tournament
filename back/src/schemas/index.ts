import LevelSchema from "./level.schema";
import QuestionSchema from "./questions.schema";
import UserSchema from "./user.schema";
import {merge} from "loadsh"
import QuerySchema from "./Query";
import MutationSchema from "./Mutation";
import SubscriptionSchema from "./Subscriptions";


const schemas = [UserSchema.schema,QuestionSchema.schema,LevelSchema.schema,QuerySchema.schema,MutationSchema.schema,SubscriptionSchema.schema]; 
const resolvers = merge(QuerySchema.resolvers,MutationSchema.resolvers,SubscriptionSchema.resolvers)

export default { schemas,resolvers };