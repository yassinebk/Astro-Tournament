import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import AuthProvider from "../components/AuthProvider";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp as any;
