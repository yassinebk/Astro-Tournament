import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  RequestHandler,
  split,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { Auth } from "./types";
import { ChakraProvider } from "@chakra-ui/react";

const authLink = setContext((_: any, { headers }: any) => {
  if (localStorage.getItem("AuthUser") !== null) {
    const user: Auth = JSON.parse(localStorage.getItem("AuthUser") as string);

    if (!user) return null;
    console.log(user?.token?.value);
    const head = {
      headers: {
        ...headers,
        Authorization: user.token?.value ? `bearer ${user.token.value}` : null,
      },
    };
    console.log(head);
    return {
      headers: {
        ...headers,
        authorization: user.token?.value ? `bearer ${user.token.value}` : null,
      },
    };
  }
});
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});
const httpLink: ApolloLink | RequestHandler = new HttpLink({
  uri: `http://localhost:4000/graphql`,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink as any) as any
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
