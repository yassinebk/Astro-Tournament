import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthContext from "../../utils/authContext";
import { AuthNavbar } from "../Navbar";
import ScrollToTopBtn from "../ScrollToTopBtn";
import { useContext } from "react";

interface authLayoutProps {}

export const AuthLayout: React.FC<authLayoutProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      position="relative"
      justifyContent="flex-start"
      bgColor="blackAlpha.900"
      minHeight="100vh"
    >
      <AuthNavbar role={auth} />
      {/* <Sidebar /> */}
      {children}
      <ScrollToTopBtn />
    </Flex>
  );
};

export default AuthLayout;
