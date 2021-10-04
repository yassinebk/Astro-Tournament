import { Spinner, Flex } from "@chakra-ui/react";
import React from "react";
import AuthLayout from "./AuthLayout";

interface AuthLoadingScreenProps {
  isNavbar?: boolean;
}

const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({
  isNavbar = true,
}) => {
  if (isNavbar) return <AuthLayout></AuthLayout>;
  else
    return (
      <Flex justifyContent="center" alignItems="center" paddingTop="40%">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="telegram.700"
          color="telgram.900"
          size="xl"
        />
      </Flex>
    );
};

export default AuthLoadingScreen;
