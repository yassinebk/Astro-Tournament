import { Heading, HStack, VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { UserNoPassword } from "../../generated/graphql";
import { AuthLoadingScreen } from "../Auth";
import { InfoDiv } from "./InfoDiv";

interface PlayerWebViewProps {
  user: UserNoPassword;
}

export const PlayerWebView: React.FC<PlayerWebViewProps> = ({ user }) => {
  const [currentUser, setUser] = useState(user);
  useEffect(() => {
    console.log("user", user);
    setUser(user);
  }, [user]);

  if (!currentUser) return <AuthLoadingScreen isNavbar={false} />;
  return (
    <VStack
      display={["none", "none","none", "flex"]}
      gridColumnStart={2}
      gridColumnEnd={12}
      spacing={24}
      w="full"
      h="full"
      paddingTop="30px"
      justifyContent="flex-start"
      alignItems="center"
    >
      <VStack w="full" color="white" textAlign="left" paddingX="8%">
        <Heading as="h1" fontSize="45px" textAlign="inherit" w="full">
          Welcome Back{" "}
          <span
            style={{
              color: "#0B8793",
            }}
          >
            Astronaut {user.username}
          </span>
        </Heading>
        <Heading as="h2" fontSize="24px" textAlign="left" w="full">
          Here is a quick sum of everything that happned when you were away
        </Heading>
      </VStack>
      <HStack>
        <InfoDiv>
          <Heading as="h3">Total Number of players</Heading>
        </InfoDiv>
        <InfoDiv>
          <Heading as="h3">Total Number of players</Heading>
        </InfoDiv>
        <InfoDiv>
          <Heading as="h3">Total Number of players</Heading>
        </InfoDiv>
      </HStack>
    </VStack>
  );
};

export default PlayerWebView;
