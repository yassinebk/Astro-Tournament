import { Box, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import AuthContext from "../../utils/authContext";
import { AuthNavbar } from "../Navbar";
import ScrollToTopBtn from "../ScrollToTopBtn";
import { Sidebar } from "../Sidebar";

interface authLayoutProps {}

export const AuthLayout: React.FC<authLayoutProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  // const router = useRouter();
  // if (!auth&&typeof window!==undefined) {
  //  router.push("/");
  // }
  return (
    <Box
      display={["flex", "flex", "flex", "grid"]}
      alignItems="center"
      gridTemplateColumns="repeat(12,1fr)"
      flexDir="column"
      position="relative"
      justifyContent="flex-start"
      bgColor="blackAlpha.900"
      minH="100vh"
    >
      <GridItem colSpan={1} h="full">
        <Sidebar />
      </GridItem>

      <AuthNavbar role={auth?.role} />

      {/* <Sidebar /> */}
      {children}
      <ScrollToTopBtn />
    </Box>
  );
};

export default AuthLayout;
