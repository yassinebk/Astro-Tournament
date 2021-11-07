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
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { UserNoPassword } from "../../generated/graphql";
import { textStyling } from "../../theme";
import { AuthLoadingScreen } from "../Auth";
import { InfoDiv } from "./InfoDiv";

interface PlayerWebViewProps {
  user: UserNoPassword;
}

export const WebView: React.FC<PlayerWebViewProps> = ({ user }) => {
  const router = useRouter();
  const [currentUser, setUser] = useState(user);
  useEffect(() => {
    setUser(user);
  }, [user]);

  const array = [1, 2, 3];
  const mainButtonStyle = {
    colorScheme: "teal",
    w: "400px",
    h: "75px",
    fontSize: "2xl",
  };
  const secondaryButtonStyle = {
    colorScheme: "teal",
    w: "250px",
    h: "75px",
    fontSize: "2xl",
  };
  const divStyle = {
    paddingX: "25px",
    display: "flex",
    flexDir: "column",
    paddingY: "40px",
    w: ["200px", "200px", "200px", "200px", "250px", "300px"],
    h: ["200px", "180px", "180px", "200px", "200px", "200px"],
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
    fontSize: ["16px", "18px", "20px", "22px", "25px"],
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
      spacing={5}
      paddingTop="18px"
      justifyContent="flex-start"
      alignItems="center"
    >
      <VStack w="full" color="white" textAlign="left" paddingX="8%">
        <Heading as="h1" fontSize="32px" textAlign="inherit" w="full">
          Welcome Back{" "}
          <span
            style={{
              color: "#0B8793",
            }}
          >
            Astronaut {user.username}
          </span>
        </Heading>
        <Heading as="h2" fontSize="20px" textAlign="left" w="full">
          Here is a quick sum of everything that happned when you were away
        </Heading>
      </VStack>
      <HStack
        color="white"
        justifyContent="center"
        w="100%"
        paddingX="1%"
        maxW="1424px"
        spacing={[12, 16, 16, 4, 16, 24]}
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

      <Box
        display={["flex", "flex", "flex", "flex", "grid"]}
        flexDir="column"
        templateColumns="repeat(24,1fr)"
        w="full"
        paddingX="3%"
        paddingBottom="24px"
      >
        <InfoDiv
          maxW="600px"
          alignSelf="center"
          alignContent="center"
          display="flex"
          flexDir="column"
          alignItems="center"
          gridColumnStart={2}
          gridColumnEnd={9}
          w="full"
          h="full"
          paddingX="24px"
          paddingY="10px"
        >
          <Box w="full" display="flex" flexDir="row" justifyContent="flex-end">
            <NextLink href="/leaderboards">
              <Button
                colorScheme="teal"
                transition="all 300ms ease-in-out"
                variant="outline"
                w="100px"
                h="35px"
                marginBottom={6}
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
                <p>View More ... </p>
              </Button>
            </NextLink>
          </Box>
          <Box w="full">
            <Heading
              color="#7FD8D8"
              marginX="auto"
              textAlign="center"
              size="lg"
            >
              Leaderboards
            </Heading>
            <Grid
              marginX="auto"
              w="90%"
              color="white"
              h="full"
              gridTemplateColumns={[
                "repeat(2,1fr)",
                "repeat(2,1fr)",
                "repeat(2,1fr)",
                "repeat(2,1fr)",
                "repeat(1,1fr)",
              ]}
              paddingX="auto"
              paddingTop="8px"
              fontSize="24px"
              alignContent="space-between"
              justifyItems="center"
            >
              {array.map((el, index) => (
                <GridItem key={index} margin="2px" display="flex" flexDir="row">
                  <span
                    style={{
                      color: "#93C0C6",
                      marginRight: "4px",
                    }}
                  >
                    {index + 1}.{"     "}
                  </span>
                  <Text
                    {...textStyling.body1}
                    textAlign="center"
                    display="flex"
                    w="full"
                    flexDir="row"
                    maxW="120px"
                    justifyContent="space-around"
                  >
                    <Text>{"    " + "Name"}</Text>
                  </Text>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </InfoDiv>
        <GridItem
          colStart={9}
          paddingLeft="20px"
          colEnd={14}
          justifyItems="center"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          marginTop={10}
        >
          <NextLink href={`${router.asPath}/admin/levelEditor`}>
            <Button
              {...mainButtonStyle}
              marginBottom="16px"
              variant="outline"
              maxW="450px"
              maxH="70px"
            >
              Edit Levels
            </Button>
          </NextLink>

          <NextLink href={`${router.asPath}/admin/questionsEditor`}>
            <Button
              {...mainButtonStyle}
              variant="outline"
              maxW="450px"
              maxH="70px"
              marginBottom="16px"
            >
              Edit Questions
            </Button>
          </NextLink>
          <HStack w="fit-content" h="fit-content" justifyContent="center">
            <NextLink href={`${router.asPath}/admin/usersList`}>
              <Button
                {...secondaryButtonStyle}
                variant="outline"
                marginRight="24px"
              >
                List of users
              </Button>
            </NextLink>

            <Button {...secondaryButtonStyle} variant="solid">
              Notify players
            </Button>
          </HStack>
        </GridItem>
      </Box>
    </VStack>
  );
};

export default WebView;
