import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};









export type Level = {
  __typename?: 'Level';
  number: Scalars['Int'];
  questions: Array<Questions>;
  id?: Maybe<Scalars['ID']>;
};

export type LoginReturn = {
  __typename?: 'LoginReturn';
  token?: Maybe<Token>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLevel: Level;
  editLevel: Level;
  addQuestion: Questions;
  submitAnswer: Scalars['Int'];
  removeQuestion?: Maybe<Questions>;
  setScore: User;
  addUser: User;
  setLevel?: Maybe<User>;
  login?: Maybe<LoginReturn>;
  setRole?: Maybe<User>;
};


export type MutationAddLevelArgs = {
  number: Scalars['Int'];
  questions?: Maybe<Array<Scalars['ID']>>;
};


export type MutationEditLevelArgs = {
  id: Scalars['ID'];
  questions?: Maybe<Array<Scalars['ID']>>;
};


export type MutationAddQuestionArgs = {
  question: Scalars['String'];
  type: Scalars['String'];
  answer: Scalars['String'];
  multipleChoices?: Maybe<Array<Scalars['String']>>;
  value: Scalars['Int'];
};


export type MutationSubmitAnswerArgs = {
  id: Scalars['ID'];
  answer: Scalars['String'];
};


export type MutationRemoveQuestionArgs = {
  id: Scalars['ID'];
};


export type MutationSetScoreArgs = {
  id: Scalars['ID'];
  score: Scalars['Int'];
};


export type MutationAddUserArgs = {
  role: Role;
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSetLevelArgs = {
  level: Scalars['ID'];
  user_id: Scalars['ID'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSetRoleArgs = {
  id: Scalars['ID'];
  role: Scalars['String'];
};

export enum QTypes {
  Select = 'SELECT',
  Tf = 'TF',
  Fill = 'FILL'
}

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  findUser: User;
  me?: Maybe<User>;
  participantsCount: Scalars['Int'];
  allLevels: Array<Maybe<Level>>;
  getLevel?: Maybe<Level>;
  getQuestions: Array<Questions>;
  allQuestions: Array<Questions>;
};


export type QueryAllUsersArgs = {
  role?: Maybe<Scalars['String']>;
};


export type QueryFindUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetLevelArgs = {
  id: Scalars['ID'];
};


export type QueryGetQuestionsArgs = {
  id: Scalars['ID'];
};

export type Questions = {
  __typename?: 'Questions';
  id: Scalars['ID'];
  question: Scalars['String'];
  type: QTypes;
  multipleChoices: Array<Scalars['String']>;
  answer: Scalars['String'];
  value: Scalars['Int'];
};

export enum Role {
  Admin = 'ADMIN',
  Player = 'PLAYER'
}

export type Subscription = {
  __typename?: 'Subscription';
  participantJoined: User;
  leaderboardCheck: User;
};

export enum TfEnum {
  True = 'TRUE',
  False = 'FALSE'
}

export type Token = {
  __typename?: 'Token';
  value?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  score: Scalars['Int'];
  password: Scalars['String'];
  role: Scalars['String'];
  level: Scalars['ID'];
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Level: ResolverTypeWrapper<Level>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  LoginReturn: ResolverTypeWrapper<LoginReturn>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  QTypes: QTypes;
  Query: ResolverTypeWrapper<{}>;
  Questions: ResolverTypeWrapper<Questions>;
  Role: Role;
  Subscription: ResolverTypeWrapper<{}>;
  TFEnum: TfEnum;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<User>;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Level: Level;
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  LoginReturn: LoginReturn;
  Mutation: {};
  String: Scalars['String'];
  Query: {};
  Questions: Questions;
  Subscription: {};
  Token: Token;
  User: User;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean'];
};

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LevelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Level'] = ResolversParentTypes['Level']> = {
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['Questions']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginReturnResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginReturn'] = ResolversParentTypes['LoginReturn']> = {
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addLevel?: Resolver<ResolversTypes['Level'], ParentType, ContextType, RequireFields<MutationAddLevelArgs, 'number'>>;
  editLevel?: Resolver<ResolversTypes['Level'], ParentType, ContextType, RequireFields<MutationEditLevelArgs, 'id'>>;
  addQuestion?: Resolver<ResolversTypes['Questions'], ParentType, ContextType, RequireFields<MutationAddQuestionArgs, 'question' | 'type' | 'answer' | 'value'>>;
  submitAnswer?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationSubmitAnswerArgs, 'id' | 'answer'>>;
  removeQuestion?: Resolver<Maybe<ResolversTypes['Questions']>, ParentType, ContextType, RequireFields<MutationRemoveQuestionArgs, 'id'>>;
  setScore?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSetScoreArgs, 'id' | 'score'>>;
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'role' | 'email' | 'username' | 'password'>>;
  setLevel?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSetLevelArgs, 'level' | 'user_id'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginReturn']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>;
  setRole?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSetRoleArgs, 'id' | 'role'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryAllUsersArgs, never>>;
  findUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryFindUserArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  participantsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  allLevels?: Resolver<Array<Maybe<ResolversTypes['Level']>>, ParentType, ContextType>;
  getLevel?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType, RequireFields<QueryGetLevelArgs, 'id'>>;
  getQuestions?: Resolver<Array<ResolversTypes['Questions']>, ParentType, ContextType, RequireFields<QueryGetQuestionsArgs, 'id'>>;
  allQuestions?: Resolver<Array<ResolversTypes['Questions']>, ParentType, ContextType>;
};

export type QuestionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Questions'] = ResolversParentTypes['Questions']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['QTypes'], ParentType, ContextType>;
  multipleChoices?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  participantJoined?: SubscriptionResolver<ResolversTypes['User'], "participantJoined", ParentType, ContextType>;
  leaderboardCheck?: SubscriptionResolver<ResolversTypes['User'], "leaderboardCheck", ParentType, ContextType>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Level?: LevelResolvers<ContextType>;
  LoginReturn?: LoginReturnResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Questions?: QuestionsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';