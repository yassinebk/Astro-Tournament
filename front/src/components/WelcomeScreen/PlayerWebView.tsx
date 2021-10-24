import { Box, Grid, Heading, HStack, VStack } from "@chakra-ui/layout";
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
          <Heading {...cardInfoStyle} textAlign="center">
            MoonShine-1800
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
        <InfoDiv gridColumnStart={1} gridColumnEnd={7} width="full"></InfoDiv>
      </Grid>
    </VStack>
  );
};

export default PlayerWebView;
