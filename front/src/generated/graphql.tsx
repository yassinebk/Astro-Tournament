import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddLevelResponse = {
  __typename?: 'AddLevelResponse';
  error?: Maybe<FieldError>;
  level?: Maybe<Level>;
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  error?: Maybe<OperationError>;
  value?: Maybe<Scalars['Boolean']>;
};

export type CrudLevelResponse = {
  __typename?: 'CrudLevelResponse';
  error?: Maybe<OperationError>;
  level?: Maybe<Level>;
};

export type CrudQuestionResponse = {
  __typename?: 'CrudQuestionResponse';
  error?: Maybe<OperationError>;
  question?: Maybe<Questions>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Level = {
  __typename?: 'Level';
  Questions: Array<Questions>;
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  number?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  user?: Maybe<UserNoPassword>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLevel: AddLevelResponse;
  addQuestion: CrudQuestionResponse;
  addQuestionToLevel: CrudLevelResponse;
  answerQuestion: BooleanResponse;
  changePassword: UserChangeToken;
  deleteQuestion: BooleanResponse;
  editQuestion: CrudQuestionResponse;
  editRole: BooleanResponse;
  login: UserLoginResponse;
  register: UserResponse;
  setLevel: BooleanResponse;
  setLevelNumber: CrudLevelResponse;
  setRole: BooleanResponse;
  setScore: BooleanResponse;
};


export type MutationAddLevelArgs = {
  options: NewLevelInput;
};


export type MutationAddQuestionArgs = {
  options: NewQuestionInfo;
};


export type MutationAddQuestionToLevelArgs = {
  levelId: Scalars['String'];
  orderNumber?: Maybe<Scalars['Int']>;
  questionId: Scalars['String'];
};


export type MutationAnswerQuestionArgs = {
  answer: Scalars['String'];
  questionId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  email: Scalars['String'];
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['String'];
};


export type MutationEditQuestionArgs = {
  newInfos: EditQuestionInfo;
  questionId: Scalars['String'];
};


export type MutationEditRoleArgs = {
  role: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationLoginArgs = {
  options: UserLoginInfos;
};


export type MutationRegisterArgs = {
  options: UserRegisterInfos;
};


export type MutationSetLevelArgs = {
  levelId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSetLevelNumberArgs = {
  levelId: Scalars['String'];
  number: Scalars['Int'];
};


export type MutationSetRoleArgs = {
  role: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSetScoreArgs = {
  score: Scalars['Int'];
  userId: Scalars['String'];
};

export type NewLevelInput = {
  name: Scalars['String'];
  number?: Maybe<Scalars['Float']>;
};

export type NewQuestionInfo = {
  answer: Scalars['String'];
  choices?: Maybe<Array<Scalars['String']>>;
  points: Scalars['Int'];
  question: Scalars['String'];
  questionType: Question_Type;
};

export type OperationError = {
  __typename?: 'OperationError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export enum Question_Type {
  Answer = 'ANSWER',
  Multia = 'MULTIA'
}

export type Query = {
  __typename?: 'Query';
  allLevels: Array<Level>;
  allQuestions: Array<Questions>;
  allUsers?: Maybe<Array<UserBasicInfo>>;
  findQuestion: CrudQuestionResponse;
  findUser?: Maybe<UserNoPassword>;
  getLevel?: Maybe<Level>;
  me?: Maybe<MeResponse>;
  participantsCount: Scalars['Float'];
};


export type QueryFindQuestionArgs = {
  questionId: Scalars['String'];
};


export type QueryFindUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetLevelArgs = {
  levelId: Scalars['String'];
};

export type Questions = {
  __typename?: 'Questions';
  _id: Scalars['ID'];
  answer: Scalars['String'];
  choices?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  orderNumber?: Maybe<Scalars['Int']>;
  points?: Maybe<Scalars['Int']>;
  question: Scalars['String'];
  questionType: Question_Type;
  updatedAt: Scalars['DateTime'];
};

export enum Role {
  Admin = 'ADMIN',
  Player = 'PLAYER'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  answeredQuestions: Array<Questions>;
  createdAt: Scalars['DateTime'];
  currentQuestion: Questions;
  email: Scalars['String'];
  fullname?: Maybe<Scalars['String']>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  level?: Maybe<Level>;
  password: Scalars['String'];
  role: Role;
  score?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UserBasicInfo = {
  __typename?: 'UserBasicInfo';
  createdAt: Scalars['DateTime'];
  levelNumber?: Maybe<Scalars['Int']>;
  score: Scalars['Float'];
  username: Scalars['String'];
};

export type UserChangeToken = {
  __typename?: 'UserChangeToken';
  token: Scalars['String'];
};

export type UserLoginInfos = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type UserLoginResponse = {
  __typename?: 'UserLoginResponse';
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<UserNoPassword>;
};

export type UserNoPassword = {
  __typename?: 'UserNoPassword';
  _id: Scalars['ID'];
  answeredQuestions: Array<Questions>;
  createdAt: Scalars['DateTime'];
  currentQuestion?: Maybe<Questions>;
  email: Scalars['String'];
  fullname?: Maybe<Scalars['String']>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  level?: Maybe<Scalars['ID']>;
  role: Role;
  score?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UserRegisterInfos = {
  email: Scalars['String'];
  fullname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type EditQuestionInfo = {
  answer?: Maybe<Scalars['String']>;
  choices?: Maybe<Array<Scalars['String']>>;
  points?: Maybe<Scalars['Int']>;
  questionType?: Maybe<Question_Type>;
};

export type AddLevelMutationVariables = Exact<{
  addLevelOptions: NewLevelInput;
}>;


export type AddLevelMutation = { __typename?: 'Mutation', addLevel: { __typename?: 'AddLevelResponse', error?: Maybe<{ __typename?: 'FieldError', field: string, message: string }>, level?: Maybe<{ __typename?: 'Level', _id: string, createdAt?: Maybe<any>, number?: Maybe<number>, updatedAt?: Maybe<any> }> } };

export type AddQuestionMutationVariables = Exact<{
  options: NewQuestionInfo;
}>;


export type AddQuestionMutation = { __typename?: 'Mutation', addQuestion: { __typename?: 'CrudQuestionResponse', error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }>, question?: Maybe<{ __typename?: 'Questions', _id: string, answer: string, question: string, points?: Maybe<number>, questionType: Question_Type, choices?: Maybe<Array<string>> }> } };

export type AddQuestionToLevelMutationVariables = Exact<{
  questionId: Scalars['String'];
  levelId: Scalars['String'];
  orderNumber?: Maybe<Scalars['Int']>;
}>;


export type AddQuestionToLevelMutation = { __typename?: 'Mutation', addQuestionToLevel: { __typename?: 'CrudLevelResponse', error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }>, level?: Maybe<{ __typename?: 'Level', _id: string, updatedAt?: Maybe<any>, number?: Maybe<number>, Questions: Array<{ __typename?: 'Questions', _id: string, answer: string }> }> } };

export type AnswerQuestionMutationVariables = Exact<{
  questionId: Scalars['String'];
  answer: Scalars['String'];
}>;


export type AnswerQuestionMutation = { __typename?: 'Mutation', answerQuestion: { __typename?: 'BooleanResponse', value?: Maybe<boolean>, error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }> } };

export type EditQuestionMutationVariables = Exact<{
  newInfos: EditQuestionInfo;
  questionId: Scalars['String'];
}>;


export type EditQuestionMutation = { __typename?: 'Mutation', editQuestion: { __typename?: 'CrudQuestionResponse', error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }>, question?: Maybe<{ __typename?: 'Questions', questionType: Question_Type, _id: string, answer: string, choices?: Maybe<Array<string>>, updatedAt: any }> } };

export type LoginMutationVariables = Exact<{
  option: UserLoginInfos;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserLoginResponse', token?: Maybe<string>, user?: Maybe<{ __typename?: 'UserNoPassword', _id: string, username: string, email: string, createdAt: any, lastLogin?: Maybe<any>, level?: Maybe<string>, role: Role }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInfos;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', _id: string, email: string, username: string, fullname?: Maybe<string>, lastLogin?: Maybe<any>, createdAt: any, answeredQuestions: Array<{ __typename?: 'Questions', _id: string, points?: Maybe<number> }>, level?: Maybe<{ __typename?: 'Level', _id: string }> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type SetLevelMutationVariables = Exact<{
  levelId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type SetLevelMutation = { __typename?: 'Mutation', setLevel: { __typename?: 'BooleanResponse', value?: Maybe<boolean>, error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }> } };

export type SetLevelNumberMutationVariables = Exact<{
  levelId: Scalars['String'];
  number: Scalars['Int'];
}>;


export type SetLevelNumberMutation = { __typename?: 'Mutation', setLevelNumber: { __typename?: 'CrudLevelResponse', error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }>, level?: Maybe<{ __typename?: 'Level', _id: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, number?: Maybe<number> }> } };

export type SetRoleMutationVariables = Exact<{
  setRoleRole: Scalars['String'];
  setRoleUserId: Scalars['String'];
}>;


export type SetRoleMutation = { __typename?: 'Mutation', setRole: { __typename?: 'BooleanResponse', value?: Maybe<boolean>, error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }> } };

export type SetScoreMutationVariables = Exact<{
  score: Scalars['Int'];
  id: Scalars['String'];
}>;


export type SetScoreMutation = { __typename?: 'Mutation', setScore: { __typename?: 'BooleanResponse', value?: Maybe<boolean>, error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }> } };

export type AllLevelQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLevelQuery = { __typename?: 'Query', allLevels: Array<{ __typename?: 'Level', name: string, _id: string, number?: Maybe<number>, createdAt?: Maybe<any>, Questions: Array<{ __typename?: 'Questions', questionType: Question_Type, _id: string, answer: string, points?: Maybe<number>, question: string, createdAt: any, updatedAt: any }> }> };

export type AllQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllQuestionsQuery = { __typename?: 'Query', allQuestions: Array<{ __typename?: 'Questions', _id: string, answer: string, question: string, createdAt: any, points?: Maybe<number>, updatedAt: any }> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers?: Maybe<Array<{ __typename?: 'UserBasicInfo', createdAt: any, score: number, username: string, levelNumber?: Maybe<number> }>> };

export type FindQuestionQueryVariables = Exact<{
  questionId: Scalars['String'];
}>;


export type FindQuestionQuery = { __typename?: 'Query', findQuestion: { __typename?: 'CrudQuestionResponse', error?: Maybe<{ __typename?: 'OperationError', message: string, type: string }>, question?: Maybe<{ __typename?: 'Questions', answer: string, choices?: Maybe<Array<string>>, createdAt: any, updatedAt: any, points?: Maybe<number>, question: string, questionType: Question_Type }> } };

export type FindUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser?: Maybe<{ __typename?: 'UserNoPassword', _id: string, username: string, level?: Maybe<string> }> };

export type GetLevelQueryVariables = Exact<{
  levelId: Scalars['String'];
}>;


export type GetLevelQuery = { __typename?: 'Query', getLevel?: Maybe<{ __typename?: 'Level', _id: string, createdAt?: Maybe<any>, updatedAt?: Maybe<any>, number?: Maybe<number>, Questions: Array<{ __typename?: 'Questions', _id: string, answer: string, question: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'MeResponse', user?: Maybe<{ __typename?: 'UserNoPassword', score?: Maybe<number>, createdAt: any, lastLogin?: Maybe<any>, level?: Maybe<string>, role: Role, username: string, fullname?: Maybe<string>, _id: string, currentQuestion?: Maybe<{ __typename?: 'Questions', _id: string, questionType: Question_Type, question: string, points?: Maybe<number> }>, answeredQuestions: Array<{ __typename?: 'Questions', _id: string, questionType: Question_Type, question: string, answer: string, choices?: Maybe<Array<string>>, points?: Maybe<number>, orderNumber?: Maybe<number> }> }> }> };

export type ParticipantsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ParticipantsCountQuery = { __typename?: 'Query', participantsCount: number };


export const AddLevelDocument = gql`
    mutation addLevel($addLevelOptions: NewLevelInput!) {
  addLevel(options: $addLevelOptions) {
    error {
      field
      message
    }
    level {
      _id
      createdAt
      number
      updatedAt
    }
  }
}
    `;
export type AddLevelMutationFn = Apollo.MutationFunction<AddLevelMutation, AddLevelMutationVariables>;

/**
 * __useAddLevelMutation__
 *
 * To run a mutation, you first call `useAddLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLevelMutation, { data, loading, error }] = useAddLevelMutation({
 *   variables: {
 *      addLevelOptions: // value for 'addLevelOptions'
 *   },
 * });
 */
export function useAddLevelMutation(baseOptions?: Apollo.MutationHookOptions<AddLevelMutation, AddLevelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLevelMutation, AddLevelMutationVariables>(AddLevelDocument, options);
      }
export type AddLevelMutationHookResult = ReturnType<typeof useAddLevelMutation>;
export type AddLevelMutationResult = Apollo.MutationResult<AddLevelMutation>;
export type AddLevelMutationOptions = Apollo.BaseMutationOptions<AddLevelMutation, AddLevelMutationVariables>;
export const AddQuestionDocument = gql`
    mutation addQuestion($options: NewQuestionInfo!) {
  addQuestion(options: $options) {
    error {
      message
      type
    }
    question {
      _id
      answer
      question
      points
      questionType
      choices
    }
  }
}
    `;
export type AddQuestionMutationFn = Apollo.MutationFunction<AddQuestionMutation, AddQuestionMutationVariables>;

/**
 * __useAddQuestionMutation__
 *
 * To run a mutation, you first call `useAddQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQuestionMutation, { data, loading, error }] = useAddQuestionMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddQuestionMutation(baseOptions?: Apollo.MutationHookOptions<AddQuestionMutation, AddQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddQuestionMutation, AddQuestionMutationVariables>(AddQuestionDocument, options);
      }
export type AddQuestionMutationHookResult = ReturnType<typeof useAddQuestionMutation>;
export type AddQuestionMutationResult = Apollo.MutationResult<AddQuestionMutation>;
export type AddQuestionMutationOptions = Apollo.BaseMutationOptions<AddQuestionMutation, AddQuestionMutationVariables>;
export const AddQuestionToLevelDocument = gql`
    mutation addQuestionToLevel($questionId: String!, $levelId: String!, $orderNumber: Int) {
  addQuestionToLevel(
    questionId: $questionId
    levelId: $levelId
    orderNumber: $orderNumber
  ) {
    error {
      message
      type
    }
    level {
      _id
      updatedAt
      Questions {
        _id
        answer
      }
      updatedAt
      number
    }
  }
}
    `;
export type AddQuestionToLevelMutationFn = Apollo.MutationFunction<AddQuestionToLevelMutation, AddQuestionToLevelMutationVariables>;

/**
 * __useAddQuestionToLevelMutation__
 *
 * To run a mutation, you first call `useAddQuestionToLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQuestionToLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQuestionToLevelMutation, { data, loading, error }] = useAddQuestionToLevelMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      levelId: // value for 'levelId'
 *      orderNumber: // value for 'orderNumber'
 *   },
 * });
 */
export function useAddQuestionToLevelMutation(baseOptions?: Apollo.MutationHookOptions<AddQuestionToLevelMutation, AddQuestionToLevelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddQuestionToLevelMutation, AddQuestionToLevelMutationVariables>(AddQuestionToLevelDocument, options);
      }
export type AddQuestionToLevelMutationHookResult = ReturnType<typeof useAddQuestionToLevelMutation>;
export type AddQuestionToLevelMutationResult = Apollo.MutationResult<AddQuestionToLevelMutation>;
export type AddQuestionToLevelMutationOptions = Apollo.BaseMutationOptions<AddQuestionToLevelMutation, AddQuestionToLevelMutationVariables>;
export const AnswerQuestionDocument = gql`
    mutation answerQuestion($questionId: String!, $answer: String!) {
  answerQuestion(questionId: $questionId, answer: $answer) {
    value
    error {
      message
      type
    }
  }
}
    `;
export type AnswerQuestionMutationFn = Apollo.MutationFunction<AnswerQuestionMutation, AnswerQuestionMutationVariables>;

/**
 * __useAnswerQuestionMutation__
 *
 * To run a mutation, you first call `useAnswerQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerQuestionMutation, { data, loading, error }] = useAnswerQuestionMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      answer: // value for 'answer'
 *   },
 * });
 */
export function useAnswerQuestionMutation(baseOptions?: Apollo.MutationHookOptions<AnswerQuestionMutation, AnswerQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnswerQuestionMutation, AnswerQuestionMutationVariables>(AnswerQuestionDocument, options);
      }
export type AnswerQuestionMutationHookResult = ReturnType<typeof useAnswerQuestionMutation>;
export type AnswerQuestionMutationResult = Apollo.MutationResult<AnswerQuestionMutation>;
export type AnswerQuestionMutationOptions = Apollo.BaseMutationOptions<AnswerQuestionMutation, AnswerQuestionMutationVariables>;
export const EditQuestionDocument = gql`
    mutation editQuestion($newInfos: editQuestionInfo!, $questionId: String!) {
  editQuestion(newInfos: $newInfos, questionId: $questionId) {
    error {
      message
      type
    }
    question {
      questionType
      _id
      answer
      choices
      updatedAt
    }
  }
}
    `;
export type EditQuestionMutationFn = Apollo.MutationFunction<EditQuestionMutation, EditQuestionMutationVariables>;

/**
 * __useEditQuestionMutation__
 *
 * To run a mutation, you first call `useEditQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editQuestionMutation, { data, loading, error }] = useEditQuestionMutation({
 *   variables: {
 *      newInfos: // value for 'newInfos'
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useEditQuestionMutation(baseOptions?: Apollo.MutationHookOptions<EditQuestionMutation, EditQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditQuestionMutation, EditQuestionMutationVariables>(EditQuestionDocument, options);
      }
export type EditQuestionMutationHookResult = ReturnType<typeof useEditQuestionMutation>;
export type EditQuestionMutationResult = Apollo.MutationResult<EditQuestionMutation>;
export type EditQuestionMutationOptions = Apollo.BaseMutationOptions<EditQuestionMutation, EditQuestionMutationVariables>;
export const LoginDocument = gql`
    mutation login($option: UserLoginInfos!) {
  login(options: $option) {
    user {
      _id
      username
      email
      createdAt
      lastLogin
      level
      role
    }
    errors {
      field
      message
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      option: // value for 'option'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($options: UserRegisterInfos!) {
  register(options: $options) {
    user {
      _id
      answeredQuestions {
        _id
        points
      }
      email
      username
      fullname
      lastLogin
      createdAt
      level {
        _id
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetLevelDocument = gql`
    mutation setLevel($levelId: String!, $userId: String!) {
  setLevel(levelId: $levelId, userId: $userId) {
    error {
      message
      type
    }
    value
  }
}
    `;
export type SetLevelMutationFn = Apollo.MutationFunction<SetLevelMutation, SetLevelMutationVariables>;

/**
 * __useSetLevelMutation__
 *
 * To run a mutation, you first call `useSetLevelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLevelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLevelMutation, { data, loading, error }] = useSetLevelMutation({
 *   variables: {
 *      levelId: // value for 'levelId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSetLevelMutation(baseOptions?: Apollo.MutationHookOptions<SetLevelMutation, SetLevelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetLevelMutation, SetLevelMutationVariables>(SetLevelDocument, options);
      }
export type SetLevelMutationHookResult = ReturnType<typeof useSetLevelMutation>;
export type SetLevelMutationResult = Apollo.MutationResult<SetLevelMutation>;
export type SetLevelMutationOptions = Apollo.BaseMutationOptions<SetLevelMutation, SetLevelMutationVariables>;
export const SetLevelNumberDocument = gql`
    mutation setLevelNumber($levelId: String!, $number: Int!) {
  setLevelNumber(levelId: $levelId, number: $number) {
    error {
      message
      type
    }
    level {
      _id
      createdAt
      updatedAt
      number
    }
  }
}
    `;
export type SetLevelNumberMutationFn = Apollo.MutationFunction<SetLevelNumberMutation, SetLevelNumberMutationVariables>;

/**
 * __useSetLevelNumberMutation__
 *
 * To run a mutation, you first call `useSetLevelNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLevelNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLevelNumberMutation, { data, loading, error }] = useSetLevelNumberMutation({
 *   variables: {
 *      levelId: // value for 'levelId'
 *      number: // value for 'number'
 *   },
 * });
 */
export function useSetLevelNumberMutation(baseOptions?: Apollo.MutationHookOptions<SetLevelNumberMutation, SetLevelNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetLevelNumberMutation, SetLevelNumberMutationVariables>(SetLevelNumberDocument, options);
      }
export type SetLevelNumberMutationHookResult = ReturnType<typeof useSetLevelNumberMutation>;
export type SetLevelNumberMutationResult = Apollo.MutationResult<SetLevelNumberMutation>;
export type SetLevelNumberMutationOptions = Apollo.BaseMutationOptions<SetLevelNumberMutation, SetLevelNumberMutationVariables>;
export const SetRoleDocument = gql`
    mutation setRole($setRoleRole: String!, $setRoleUserId: String!) {
  setRole(role: $setRoleRole, userId: $setRoleUserId) {
    error {
      message
      type
    }
    value
  }
}
    `;
export type SetRoleMutationFn = Apollo.MutationFunction<SetRoleMutation, SetRoleMutationVariables>;

/**
 * __useSetRoleMutation__
 *
 * To run a mutation, you first call `useSetRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRoleMutation, { data, loading, error }] = useSetRoleMutation({
 *   variables: {
 *      setRoleRole: // value for 'setRoleRole'
 *      setRoleUserId: // value for 'setRoleUserId'
 *   },
 * });
 */
export function useSetRoleMutation(baseOptions?: Apollo.MutationHookOptions<SetRoleMutation, SetRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetRoleMutation, SetRoleMutationVariables>(SetRoleDocument, options);
      }
export type SetRoleMutationHookResult = ReturnType<typeof useSetRoleMutation>;
export type SetRoleMutationResult = Apollo.MutationResult<SetRoleMutation>;
export type SetRoleMutationOptions = Apollo.BaseMutationOptions<SetRoleMutation, SetRoleMutationVariables>;
export const SetScoreDocument = gql`
    mutation setScore($score: Int!, $id: String!) {
  setScore(score: $score, userId: $id) {
    error {
      message
      type
    }
    value
  }
}
    `;
export type SetScoreMutationFn = Apollo.MutationFunction<SetScoreMutation, SetScoreMutationVariables>;

/**
 * __useSetScoreMutation__
 *
 * To run a mutation, you first call `useSetScoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetScoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setScoreMutation, { data, loading, error }] = useSetScoreMutation({
 *   variables: {
 *      score: // value for 'score'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetScoreMutation(baseOptions?: Apollo.MutationHookOptions<SetScoreMutation, SetScoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetScoreMutation, SetScoreMutationVariables>(SetScoreDocument, options);
      }
export type SetScoreMutationHookResult = ReturnType<typeof useSetScoreMutation>;
export type SetScoreMutationResult = Apollo.MutationResult<SetScoreMutation>;
export type SetScoreMutationOptions = Apollo.BaseMutationOptions<SetScoreMutation, SetScoreMutationVariables>;
export const AllLevelDocument = gql`
    query allLevel {
  allLevels {
    name
    _id
    number
    createdAt
    Questions {
      questionType
      _id
      answer
      points
      question
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useAllLevelQuery__
 *
 * To run a query within a React component, call `useAllLevelQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLevelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLevelQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllLevelQuery(baseOptions?: Apollo.QueryHookOptions<AllLevelQuery, AllLevelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllLevelQuery, AllLevelQueryVariables>(AllLevelDocument, options);
      }
export function useAllLevelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLevelQuery, AllLevelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllLevelQuery, AllLevelQueryVariables>(AllLevelDocument, options);
        }
export type AllLevelQueryHookResult = ReturnType<typeof useAllLevelQuery>;
export type AllLevelLazyQueryHookResult = ReturnType<typeof useAllLevelLazyQuery>;
export type AllLevelQueryResult = Apollo.QueryResult<AllLevelQuery, AllLevelQueryVariables>;
export const AllQuestionsDocument = gql`
    query allQuestions {
  allQuestions {
    _id
    answer
    question
    createdAt
    points
    updatedAt
  }
}
    `;

/**
 * __useAllQuestionsQuery__
 *
 * To run a query within a React component, call `useAllQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<AllQuestionsQuery, AllQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllQuestionsQuery, AllQuestionsQueryVariables>(AllQuestionsDocument, options);
      }
export function useAllQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllQuestionsQuery, AllQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllQuestionsQuery, AllQuestionsQueryVariables>(AllQuestionsDocument, options);
        }
export type AllQuestionsQueryHookResult = ReturnType<typeof useAllQuestionsQuery>;
export type AllQuestionsLazyQueryHookResult = ReturnType<typeof useAllQuestionsLazyQuery>;
export type AllQuestionsQueryResult = Apollo.QueryResult<AllQuestionsQuery, AllQuestionsQueryVariables>;
export const AllUsersDocument = gql`
    query allUsers {
  allUsers {
    createdAt
    score
    username
    levelNumber
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const FindQuestionDocument = gql`
    query findQuestion($questionId: String!) {
  findQuestion(questionId: $questionId) {
    error {
      message
      type
    }
    question {
      answer
      choices
      createdAt
      updatedAt
      points
      question
      questionType
    }
  }
}
    `;

/**
 * __useFindQuestionQuery__
 *
 * To run a query within a React component, call `useFindQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindQuestionQuery({
 *   variables: {
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useFindQuestionQuery(baseOptions: Apollo.QueryHookOptions<FindQuestionQuery, FindQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindQuestionQuery, FindQuestionQueryVariables>(FindQuestionDocument, options);
      }
export function useFindQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindQuestionQuery, FindQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindQuestionQuery, FindQuestionQueryVariables>(FindQuestionDocument, options);
        }
export type FindQuestionQueryHookResult = ReturnType<typeof useFindQuestionQuery>;
export type FindQuestionLazyQueryHookResult = ReturnType<typeof useFindQuestionLazyQuery>;
export type FindQuestionQueryResult = Apollo.QueryResult<FindQuestionQuery, FindQuestionQueryVariables>;
export const FindUserDocument = gql`
    query findUser($userId: String!) {
  findUser(userId: $userId) {
    _id
    username
    level
  }
}
    `;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindUserQuery(baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
      }
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
        }
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;
export const GetLevelDocument = gql`
    query getLevel($levelId: String!) {
  getLevel(levelId: $levelId) {
    _id
    createdAt
    updatedAt
    number
    Questions {
      _id
      answer
      question
    }
  }
}
    `;

/**
 * __useGetLevelQuery__
 *
 * To run a query within a React component, call `useGetLevelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLevelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLevelQuery({
 *   variables: {
 *      levelId: // value for 'levelId'
 *   },
 * });
 */
export function useGetLevelQuery(baseOptions: Apollo.QueryHookOptions<GetLevelQuery, GetLevelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLevelQuery, GetLevelQueryVariables>(GetLevelDocument, options);
      }
export function useGetLevelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLevelQuery, GetLevelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLevelQuery, GetLevelQueryVariables>(GetLevelDocument, options);
        }
export type GetLevelQueryHookResult = ReturnType<typeof useGetLevelQuery>;
export type GetLevelLazyQueryHookResult = ReturnType<typeof useGetLevelLazyQuery>;
export type GetLevelQueryResult = Apollo.QueryResult<GetLevelQuery, GetLevelQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      currentQuestion {
        _id
        questionType
        question
        points
      }
      answeredQuestions {
        _id
        questionType
        question
        answer
        choices
        points
        orderNumber
      }
      score
      createdAt
      lastLogin
      level
      role
      username
      fullname
      _id
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ParticipantsCountDocument = gql`
    query participantsCount {
  participantsCount
}
    `;

/**
 * __useParticipantsCountQuery__
 *
 * To run a query within a React component, call `useParticipantsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useParticipantsCountQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantsCountQuery, ParticipantsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParticipantsCountQuery, ParticipantsCountQueryVariables>(ParticipantsCountDocument, options);
      }
export function useParticipantsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantsCountQuery, ParticipantsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParticipantsCountQuery, ParticipantsCountQueryVariables>(ParticipantsCountDocument, options);
        }
export type ParticipantsCountQueryHookResult = ReturnType<typeof useParticipantsCountQuery>;
export type ParticipantsCountLazyQueryHookResult = ReturnType<typeof useParticipantsCountLazyQuery>;
export type ParticipantsCountQueryResult = Apollo.QueryResult<ParticipantsCountQuery, ParticipantsCountQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    