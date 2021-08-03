import { gql } from "apollo-server-express"
const Questions = gql`
 enum TFEnum {
    TRUE
    FALSE
    }

  enum QTypes{
    SELECT
    TF ,
    FILL
  }
type Questions {
  id:ID!,
  question:String! 
  type:QTypes!
  multipleChoices:[String!]!
  answer:String!
  value:Int!
}
`




const QuestionSchema = {
    schema: Questions,
};
 

export default QuestionSchema