import { ApolloServer } from "apollo-server-express/dist/ApolloServer";
import { buildSchema } from "type-graphql";
import { LevelResolver, QuestionsResolver, UserResolver } from "../resolvers";
import { UserResponse } from "../resolvers/user";
import envs from "../utils/configs";
import connectToDb from "../utils/connect";
import setContext from "../utils/setContext";
import loginMutation from "./helpers/graphql/mutations/login";
import registerMutation from "./helpers/graphql/mutations/register";
import allUsers from "./helpers/graphql/queries/allUsers";
import { clearDatabase } from "./helpers/clearDatabase";

const createServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, LevelResolver, QuestionsResolver],
      validate: false,
    }),
    debug: true,
    context: setContext,
  });
  return server;
};

describe("Authentication Flow", () => {
  let server: ApolloServer;
  beforeAll(async () => {
    server = await createServer();
    connectToDb({ db: envs.MONGODB_URI ? envs.MONGODB_URI : "" });
    await server.start();
    await clearDatabase();
  });

  beforeEach(() => {
    //resetting state
  });

  afterAll(() => {
    //cleaning

    server.stop();
  });

  test("creating a user successfully", async () => {
    const newUser = {
      email: "hello1@gmail.com",
      fullname: "Bob roj",
      username: "user",
      password: "12345678",
    };
    const res = await server.executeOperation({
      query: registerMutation,
      variables: { options: newUser },
    });
    const userResponseData: UserResponse = res!.data!.register;
    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    expect(userResponseData.user).toBeDefined();
    if (!userResponseData.user) throw Error("user undefined");
    expect(userResponseData.user.username).toEqual("user");

    expect(userResponseData.errors).toBeNull();
  });

  test("Forgetting a field", async () => {
    const newUser = {
      email: "hello1@gmail.com",
      fullname: "Bob roj",
      username: "user",
    };
    const res = await server.executeOperation({
      query: registerMutation,
      variables: { options: newUser },
    });

    expect(res.errors).toBeDefined();
    expect(res!.errors!.length).toEqual(1);
    expect(res!.errors![0].message).toEqual(
      'Variable "$options" got invalid value { email: "hello1@gmail.com", fullname: "Bob roj", username: "user" }; Field "password" of required type "String!" was not provided.'
    );
  });

  test("userAdded", async () => {
    const res = await server.executeOperation({ query: allUsers });
    expect(res!.data!.allUsers.length).toBe(1);
  });

  test("login successful with email", async () => {
    const user = {
      usernameOrEmail: "hello1@gmail.com",
      password: "12345678",
    };

    const res = await server.executeOperation({
      query: loginMutation,
      variables: { options: user },
    });
    console.log("res", res);
    if (!res.data) throw new Error("unknown error");
    const userResponseData = res.data.login;
    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    // expect(res.data.username).
    expect(userResponseData.user).toBeDefined();
    if (!userResponseData.user) throw Error("user undefined");
    expect(userResponseData.user._id).toBeDefined();
    expect(userResponseData.user.createdAt).toBeDefined();
    expect(userResponseData.user.score).toEqual(0);
    expect(userResponseData.user.username).toEqual("user");
    expect(userResponseData.user.fullname).toEqual("Bob roj");
    expect(userResponseData.user.level).toBeNull();
    expect(userResponseData.user.answeredQuestions.length).toEqual(0);
    expect(userResponseData.token).toBeDefined();
    expect(userResponseData.errors).toBeNull();
  });

  test("login successful with username", async () => {});
});
