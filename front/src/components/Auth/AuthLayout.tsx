import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Navbar";
import ScrollToTopBtn from "../ScrollToTopBtn";

interface authLayoutProps {}

export const AuthLayout: React.FC<authLayoutProps> = ({ children }) => {
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      position="relative"
      justifyContent="flex-start"
      bgColor="blackAlpha.900"
      height="100vh"
    >
      <Navbar />
      {/* <Sidebar /> */}
      {children}
      <ScrollToTopBtn />
    </Flex>
  );
};

export default AuthLayout;
