import { ForbiddenError, gql, UserInputError } from "apollo-server-express"
import bcrypt from "bcrypt"
import envs from "../utils/configs";
import Data from "../models";
import jwt from "jsonwebtoken"
import { Resolvers } from "../generated/graphql";
import pubsub from "./constants";


const Mutation = gql`
type Mutation {

    #Level Schema
    addLevel(number:Int!,questions:[ID!]):Level!
    editLevel(id:ID!,questions:[ID!]):Level!
    
    #Question Schema
    addQuestion(question:String!,type:String!,answer:String!,multipleChoices:[String!],value:Int!):Questions!
    submitAnswer(id:ID!,answer:String!):Int!
    removeQuestion(id:ID!):Questions
    
    #User Schema
     setScore(id:ID!,score:Int!):User!
     addUser(role:Role!,email:String!,username:String!,password:String!):User! 
    setLevel(level:ID!,user_id:ID!):User
    login(username:String!,password:String!):LoginReturn
      setRole(id:ID!,role:String!):User
      
    
}
`

const resolvers: Resolvers = {

    Mutation: {
        /*Levels*/
        addLevel: async (_, args) => {
            const level = new Data.levelModel({
                number: args.number,
                questions: args.questions ? args.questions : [],
            });
            try {
                await level.save();
                const populatedLevel = await Data.levelModel.populate(level, { path: "questions" });
                console.log(populatedLevel)
                return populatedLevel;
            }
            catch (error) {
                throw new UserInputError(`Error while adding a level : ${error.message}`);
            }

        },
        editLevel: async (_, args) => {
            const level = await Data.levelModel.findById(args.id);
            if (!level) throw new UserInputError("Level to modify NOT FOUND 404");
            if (args.questions) {
                args.questions.forEach(q => {
                    if (!level.questions.includes(q)) {
                        level.questions.push(q);
                    }
                })
            };
            try {
                await level.save();
            }
            catch (error) {
                throw new UserInputError(error.message);
            }
            return level;
        },


        /*Question*/

        addQuestion: async (_, args, context) => {
            if (!context.currentUser || context.currentUser !== "ADMIN")
                throw new ForbiddenError('Denied Permission, you must be an admin')
            const question = new Data.QuestionModel({
                question: args.question,
                answer: args.answer,
                type: args.type,
                value: args.value,
                multipleChoices: args.multipleChoices,
            })
            try {
                await question.save();
            }
            catch (error) { throw new UserInputError("Failure adding question") }
            return question;
            ;
        },
        submitAnswer: async (_, args, context) => {
            if (!context.currentUser) throw new ForbiddenError("User not signed in");
            const question = await Data.QuestionModel.findById(args.id);
            if (!question) throw new ForbiddenError("404 Error Question not found");
            if (question.answer === args.answer) {
                const userUpdated = await Data.UserModel.findById(context.currentUser._id);
                userUpdated.score + question.value;
                await userUpdated.save();
                pubsub.publish("USER_SCORE_UPDATE", {
                    leaderboardCheck:
                    {
                        username: userUpdated.username,
                        email: userUpdated.email,
                        level: userUpdated.level,
                        score: userUpdated.score
                    }
                });
                return question.value;
            }
            else return 0;
        },
        removeQuestion: async (_, args, context) => {
            if (!context.currentUser || !(context.currentUser.role === "ADMIN")) {
                throw new ForbiddenError("Unauthorized , you need to be Admin");
            }
            await Data.QuestionModel.findByIdAndRemove(args.id);
            const Levels = await Data.levelModel.find({ questions: args.id });
            const updatedLevels = Levels.map(L => {
                L.questions = L.questions.filter(q => q === args.id);
                return L;
            })
            await Promise.all(updatedLevels.map(L => L.save()))
            return null as never;
        },

        /* User */
        addUser: async (_, args) => {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(args.password, saltRounds);
            const user = new Data.UserModel({ ...args, password: passwordHash, score: 0 });
            console.log("user", user);
            await user.save();
            pubsub.publish("USER_LIST_UPDATE",{participantJoined:user})
            return user;
        },
        setScore: async (_, args) => {
            const user = await Data.UserModel.findById(args.id);
            if (!user) throw new UserInputError("user is not found ");
            user.score += args.score;
            await user.save();
            console.log(user);
            return user;
        },



        setLevel: async (_, args) => {
            const user = await Data.UserModel.findById(args.user_id).populate("level");
            if (!user) throw new UserInputError("user is not found");
            const level = await Data.levelModel.findOne({ number: user.level.number + 1 });
            if (!level) user.won = true
            else { user.level = level._id; }
            await user.save();
            return user;
        },
        login: async (_, args, context) => {
            const user = await Data.UserModel.findOne({ username: args.username });
            console.log(user);
            if (!user) throw new UserInputError("User not Registered ");
            const passwrodCorrect = await bcrypt.compare(args.password, user.password);
            if (!passwrodCorrect) return null;
            else {
                const currentUser = {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    score: user.score,
                    role: user.role
                };
                console.log("currentUser", currentUser);
                const token = {
                    value: null
                }
                token.value = jwt.sign(currentUser, envs.JWT_SECRET_KEY);
                context.currentUser = currentUser;
                return ({
                    token, user: currentUser
                }) as any;
            }
        },
        },
    }

const MutationSchema = {
    schema: Mutation,
    resolvers
};
export default MutationSchema;