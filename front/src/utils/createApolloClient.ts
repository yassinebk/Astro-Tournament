import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createContext } from "react";

export function createApolloClient() {
  const link = new HttpLink({
    uri: "http://localhost:4000/graphql",
  });
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
}




const client = createApolloClient();
export default client;
