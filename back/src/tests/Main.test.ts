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

  test("Registration : Creating a user successfully", async () => {
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

  test("Registration : Forgetting a field", async () => {
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

  test("Registration : Password criteria", async () => {
    const newUser = {
      email: "hello1@gmail.com",
      fullname: "Bob roj",
      username: "user",
      password: "12345",
    };
    const res = await server.executeOperation({
      query: registerMutation,
      variables: { options: newUser },
    });
    const userResponseData: UserResponse = res!.data!.register;
    console.log(userResponseData);
    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    if (!userResponseData || typeof userResponseData.errors === "undefined")
      throw new Error("error occured");
    expect(userResponseData.errors[0]!.field).toEqual("password");
    expect(userResponseData.errors[0]!.message).toEqual(
      "Password should be at least 8 characters long"
    );
  });

  test("Registration : User already exists", async () => {
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
    console.log(userResponseData);
    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    if (!userResponseData || typeof userResponseData.errors === "undefined")
      throw new Error("error occured");
    expect(userResponseData.errors[0]!.field).toEqual("form");
    expect(userResponseData.errors[0]!.message).toEqual(
      "Username or Email exists"
    );
  });
  test("Registration : Email Criteria", async () => {
    const newUser = {
      email: "hello1mail.com",
      fullname: "Bob roj",
      username: "user",
      password: "12345678",
    };
    const res = await server.executeOperation({
      query: registerMutation,
      variables: { options: newUser },
    });
    const userResponseData: UserResponse = res!.data!.register;
    console.log(userResponseData);
    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    if (!userResponseData || typeof userResponseData.errors === "undefined")
      throw new Error("error occured");
    expect(userResponseData.errors[0]!.field).toEqual("email");
    expect(userResponseData.errors[0]!.message).toEqual("Email is invalid");
  });

  test("Registration : UsernameCriteria", async () => {
    const newUser = {
      email: "hello1@gmail.com",
      fullname: "Bob roj",
      username: "use",
      password: "12345678",
    };
    const res = await server.executeOperation({
      query: registerMutation,
      variables: { options: newUser },
    });
    const userResponseData: UserResponse = res!.data!.register;
    console.log(userResponseData);
    expect(res).toBeDefined();
    expect(res.data).toBeDefined();
    if (!userResponseData || typeof userResponseData.errors === "undefined")
      throw new Error("error occured");
    expect(userResponseData.errors[0]!.field).toEqual("username");
    expect(userResponseData.errors[0]!.message).toEqual(
      "Username should be at least 3 characters long"
    );
  });

  test("User Added", async () => {
    const res = await server.executeOperation({ query: allUsers });
    expect(res!.data!.allUsers[0].username).toEqual("user");
    expect(res!.data!.allUsers.length).toBe(1);
  });

  test("Login successful with email", async () => {
    const user = {
      usernameOrEmail: "hello1@gmail.com",
      password: "12345678",
    };

    const res = await server.executeOperation({
      query: loginMutation,
      variables: { options: user },
    });
    // console.log("res", res);
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

  test("Login successful with username", async () => {
    const user = {
      usernameOrEmail: "user",
      password: "12345678",
    };

    const res = await server.executeOperation({
      query: loginMutation,
      variables: { options: user },
    });
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

  test("Login Failure : Wrong username", async () => {
    const user = {
      usernameOrEmail: "wrongusernameandEmail",
      password: "wrongpassword",
    };
    const res = await server.executeOperation({
      query: loginMutation,
      variables: { options: user },
    });
    const errorResponse = res!.data!.login.errors;
    expect(errorResponse.length).toEqual(1);
    expect(errorResponse[0].field).toEqual("usernameOrEmail");
    expect(errorResponse[0].message).toEqual("Wrong Username or Email");
  });

  test("Login Failure : Wrong password", async () => {
    const user = {
      usernameOrEmail: "user",
      password: "wrongpassword",
    };
    const res = await server.executeOperation({
      query: loginMutation,
      variables: { options: user },
    });
    const errorResponse = res!.data!.login.errors;
    expect(errorResponse.length).toEqual(1);
    expect(errorResponse[0].field).toEqual("password");
    expect(errorResponse[0].message).toEqual("Wrong password");
  });



});
