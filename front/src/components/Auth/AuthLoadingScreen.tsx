import { Spinner, Flex } from "@chakra-ui/react";
import React from "react";
import AuthLayout from "./AuthLayout";

interface AuthLoadingScreenProps {
  isNavbar?: boolean;
}

const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({
  isNavbar = true,
}) => {
  const SpinnerView = () => {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        gridColumnStart={2}
        gridColumnEnd={12}
      >
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
  if (isNavbar)
    return (
      <AuthLayout>
        <SpinnerView />
      </AuthLayout>
    );
  else return <SpinnerView />;
};

export default AuthLoadingScreen;
