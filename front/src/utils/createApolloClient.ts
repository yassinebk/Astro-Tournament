import {
  ApolloClient,
  createHttpLink,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { withApollo as createWithApollo } from "next-apollo";
import { isBrowser } from "./isBrowser";

const getToken = () => {
  if (typeof window !== undefined) {
    const userFromStorage = localStorage.getItem("authUser");
    if (userFromStorage) {
      const { token } = JSON.parse(userFromStorage);
      return token;
    }
  }
};
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const apolloClient = new ApolloClient({
  link: from([authLink as any, httpLink]),
  cache: new InMemoryCache(),
  ssrMode: isBrowser(),
});

const withApollo = createWithApollo(apolloClient);
export default withApollo;
