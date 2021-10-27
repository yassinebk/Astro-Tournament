import { Button } from "@chakra-ui/button";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { transition } from "@chakra-ui/styled-system";
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

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1];
  const divStyle = {
    paddingX: "25px",
    display: "flex",
    flexDir: "column",
    paddingY: "40px",
    w: ["200px", "200px", "200px", "200px", "250px", "300px"],
    h: ["200px", "200px", "200px", "250px", "250px", "250px"],
    justifyContent: "space-between",
    alignItems: "center",

    transition: "all ease-in-out",
    transitionDuration: "200ms",
    _hover: {
      border: "1px solid rgba(255,255,255,0.5)",
      transform: "scale(1.1)",
    },
  };
  const cardTitleStyle = {
    fontSize: "18px",
    fontWeight: "light",
  };
  const cardInfoStyle = {
    fontSize: ["20px", "25px", "25px", "30px", "40px"],
    display: "flex",
    color: "#7FD8D8",
    fontWeight: "bold",
  };

  if (!currentUser) return <AuthLoadingScreen isNavbar={false} />;
  return (
    <VStack
      display={["none", "none", "none", "flex"]}
      gridColumnStart={2}
      gridColumnEnd={13}
      spacing={20}
      w="full"
      h="full"
      paddingTop="60px"
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
      <HStack
        color="white"
        justifyContent="space-around"
        w="100%"
        paddingX="1%"
        maxW="1424px"
        wrap="nowrap"
        textAlign="center"
      >
        <InfoDiv {...divStyle}>
          <Heading {...cardTitleStyle}>Total Number of players</Heading>
          <Heading {...cardInfoStyle}>2000</Heading>
        </InfoDiv>
        <InfoDiv {...divStyle}>
          <Box>
            <Heading {...cardTitleStyle}>Total Number of</Heading>
            <Heading {...cardTitleStyle}>acquired points</Heading>
          </Box>
          <Heading {...cardInfoStyle}>20M</Heading>
        </InfoDiv>
        <InfoDiv {...divStyle}>
          <Heading {...cardTitleStyle}>Last Level Reached</Heading>
          <Heading {...cardInfoStyle}>8</Heading>
        </InfoDiv>
        <InfoDiv {...divStyle}>
          <Heading {...cardTitleStyle}> Top Player</Heading>
          <Heading {...cardInfoStyle} height="auto">
            {/* Adding a username formatting if it's too long we add spaces fo reach 8 characters */}
            MoonShine -1800
          </Heading>
        </InfoDiv>
      </HStack>
      <Grid
        templateColumns="repeat(12,1fr)"
        minH="450px"
        w="full"
        paddingX="3%"
        paddingBottom="4%"
      >
        <InfoDiv
          display="flex"
          flexDir="column"
          alignItems="center"
          gridColumnStart={1}
          gridColumnEnd={7}
          maxW="600px"
          paddingX="8px"
          paddingY="24px"
        >
          <Box marginLeft="auto">
            <Button
              colorScheme="teal"
              transition="all 300ms ease-in-out"
              variant="outline"
              _focus={{
                color: "#7FD8D8",
                bgColor: "transparent",
                opacity: 0.8,
                scale: 1.2,
              }}
              _hover={{
                color: "#7FD8D8",
                bgColor: "transparent",
                opacity: 0.8,
                transform: "scale(0.9)",
              }}
            >
              View More ...{" "}
            </Button>
          </Box>
          <Box>
            <Heading color="#7FD8D8" marginX="auto" w="full" textAlign="center">
              Leaderboards
            </Heading>
            <Grid
              marginX="auto"
              w="full"
              color="white"
              h="full"
              gridTemplateColumns="repeat(2,1fr)"
              paddingX="auto"
              paddingY="16px"
              paddingTop="25px"
              fontSize="24px"
              justifyItems="flex-start"
            >
              {array.map((el, index) => (
                <GridItem margin="10px" paddingX="16px">
                  <Text
                    display="flex"
                    flexDir="row"
                    maxW="120px"
                    justifyContent="space-around"
                  >
                    <span
                      style={{
                        color: "#93C0C6",
                        marginRight: "4px",
                      }}
                    >
                      {index}.
                    </span>
                    <Text> Name</Text>
                  </Text>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </InfoDiv>
      </Grid>
    </VStack>
  );
};

export default PlayerWebView;
