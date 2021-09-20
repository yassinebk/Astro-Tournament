import { gql } from "apollo-server-express";

const QuestionInfoMutation = gql`
  fragment QuestionInfo on Questions {
    _id
    answer
    question
    points
    questionType
    choices
    orderNumber
  }
`;


export default QuestionInfoMutation;