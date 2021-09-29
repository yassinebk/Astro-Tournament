import { Spinner, Flex } from "@chakra-ui/react";
import React from "react";
import AuthLayout from "./Auth/AuthLayout";

interface AuthLoadingScreenProps {}

const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({}) => {
  return (
    <AuthLayout>
      <Flex justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="telegram.900"
          color="telgram.900"
          size="xl"
        />
      </Flex>
    </AuthLayout>
  );
};

export default AuthLoadingScreen;
