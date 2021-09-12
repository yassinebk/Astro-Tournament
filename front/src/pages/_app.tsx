import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "../components/Auth";

import theme from "../theme";
import { AppProps } from "next/app";
import withApollo from "../utils/createApolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp as any;
