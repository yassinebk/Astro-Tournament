import { gql } from "@apollo/client";

export const ADD_QUESTION = gql`
  mutation AddQuestion(
    $question: String!
    $type: String!
    $answer: String!
    $value: Int!
    $multipleChoices: [String!]
  ) {
    addQuestion(
      question: $question
      type: $type
      answer: $answer
      value: $value
      multipleChoices: $multipleChoices
    ) {
      id
      question
      type
      multipleChoices
      answer
      value
    }
  }
`;

export const REMOVE_QUESTION = gql`
  mutation QuestionMutation($id: ID!) {
    removeQuestion(id: $id) {
      id
      value
    }
  }
`;

export const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($id: ID!, $answer: String!) {
    submitAnswer(id: $id, answer: $answer)
  }
`;

export const ALL_QUESTIONS = gql`
  query allQuestions {
    allQuestions {
      id
      question
      type
      multipleChoices
      answer
      value
    }
  }
`;

export const GET_QUESTION = gql`
  query Query($id: ID!) {
    getQuestions(id: $id) {
      value
      answer
      multipleChoices
      question
      type
      id
    }
  }
`;
