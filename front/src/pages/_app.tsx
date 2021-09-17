import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import AuthProvider from "../components/Auth";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
</AuthProvider>
  );
}

export default MyApp as any;
