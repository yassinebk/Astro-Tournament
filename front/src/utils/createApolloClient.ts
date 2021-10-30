import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { withApollo as createWithApollo } from "next-apollo";
import { isBrowser } from "./isBrowser";

const getToken = () => {
  if (isBrowser()) {
    console.log("her");
    const userFromStorage = localStorage.getItem("authUser");
    if (userFromStorage) {
      const { token } = JSON.parse(userFromStorage);
      return token;
    }
  }
};
const authLink = setContext((_, { headers }) => {
  let token;
  if (isBrowser()) token = getToken();
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

export const apolloClient = new ApolloClient({
  link: from([authLink as any, httpLink]),
  cache: new InMemoryCache(),
  ssrMode: isBrowser(),
});

const withApollo = createWithApollo(apolloClient);
export default withApollo;
