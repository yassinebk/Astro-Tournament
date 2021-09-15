import { Flex } from "@chakra-ui/react";
import React from "react";
import { Role } from "../../generated/graphql";
import Navbar from "../Navbar";
import AuthNavbar from "../Navbar/AuthNavbar";
import ScrollToTopBtn from "../ScrollToTopBtn";
import { Sidebar } from "../Sidebar";

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
      <AuthNavbar />
      {/* <Sidebar /> */}
      {children}
      <ScrollToTopBtn />
    </Flex>
  );
};

export default AuthLayout;
