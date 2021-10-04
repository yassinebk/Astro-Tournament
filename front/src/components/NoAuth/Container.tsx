import { Flex, useColorMode, FlexProps } from "@chakra-ui/react";
import React from "react";
import { AuthProvider } from "../AuthProvider";
import { NoAuthNavbar } from "../Navbar";

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  const bgColor = {
    light:
      "linear-gradient(177.64deg, #360033 1.93%, #0B8793 42.16%, #A496DE 56.03%)",
    dark: "linear-gradient(177.64deg, #360033 1.93%, #0B8793 42.16%, #A496DE 56.03%)",
  };

  const color = { light: "black", dark: "white" };
  return (
    <AuthProvider>
      <Flex
        direction="column"
        minH="100vh"
        alignItems="center"
        justifyContent="flex-start"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        {...props}
      >
        <NoAuthNavbar />
        {props.children}
      </Flex>
    </AuthProvider>
  );
};
