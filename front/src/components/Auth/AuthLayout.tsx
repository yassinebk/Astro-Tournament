import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import AuthContext from "../../utils/authContext";
import withApollo from "../../utils/createApolloClient";
import { AuthNavbar } from "../Navbar";
import ScrollToTopBtn from "../ScrollToTopBtn";

interface authLayoutProps {}

export const AuthLayout: React.FC<authLayoutProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  // const router = useRouter();
  // if (!auth&&typeof window!==undefined) {
  //  router.push("/");
  // }
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      position="relative"
      justifyContent="flex-start"
      bgColor="blackAlpha.900"
      minH="100vh"
    >
      <AuthNavbar role={auth?.role} />
      {/* <Sidebar /> */}
      {children}
      <ScrollToTopBtn />
    </Flex>
  );
};

export default AuthLayout;
