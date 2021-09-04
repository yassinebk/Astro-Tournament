import { gql } from "@apollo/client";

export const ADD_LEVEL = gql`
  mutation AddLevel($number: Int!, $questions: [ID!]) {
    addLevel(number: $number, questions: $questions) {
      number
      questions {
        answer
        value
        multipleChoices
        type
        question
        id
      }
      id
    }
  }
`;

export const ADD_LEVEL_QUESTIONS = gql`
  mutation AddQuestionsToLevelMutation($id: ID!, $questions: [ID!]) {
    addQuestionsToLevel(id: $id, questions: $questions) {
      id
      questions {
        question
        id
        type
        multipleChoices
        answer
        value
      }
      number
    }
  }
`;

export const REMOVE_LEVEL_QUESTIONS = gql`

  mutation RemoveQuestionFromLevelMutation($id: ID!, $questions: [ID!]) {
    removeQuestionsFromLevel(id: $id, questions: $questions) {
      id
      questions {
        question
        id
        type
        multipleChoices
        answer
        value
      }
      number
    }
  }
`;

//export const EDIT_LEVEL_NUMBER = gql``;

export const ALL_LEVELS = gql`
  query allLevels {
    allLevels {
      number
      questions {
        id
        question
        answer
        value
      }
      id
    }
  }
`;
export const GET_LEVEL = gql`
  query getLevel($id: ID!) {
    getLevel(id: $getLevelId) {
      id
      number
      questions {
        id
        question
        answer
        value
      }
    }
  }
`;
