import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { AuthProvider } from "../components/AuthProvider";
import theme from "../theme";
import AuthContext from "../utils/authContext";
import { apolloClient } from "../utils/createApolloClient";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default MyApp;
