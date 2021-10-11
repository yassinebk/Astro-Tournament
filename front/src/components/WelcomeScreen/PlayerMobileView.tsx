import { Button } from "@chakra-ui/button";
import {Text, VStack, Box, Heading } from "@chakra-ui/layout";
import { CSSProperties } from "react";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import { VscRocket } from "@react-icons/all-files/vsc/VscRocket";
import router from "next/dist/client/router";
import React from "react";
import ThumbButton from "../ThumButton";
import { InfoDiv } from "./InfoDiv";

const PlayerMobileView = () => {
  const spanStyle: CSSProperties = {
    color: "#0BD3FF",
    fontSize: "24px",
    fontWeight: "bold",
  };


  return (
    <VStack
      display={["flex", "flex", "none"]}
      maxW="600px"
      flexDir="column"
      alignContent="center"
      marginTop="40px"
      paddingX="24px"
      spacing={4}
      w="100vw"
    >
      <InfoDiv
        display="flex"
        flexDir="row"
        justifyContent="space-evenly"
        width="full"
        paddingY="16px"
        color="white"
      >
        <VStack fontSize="18px" fontWeight="800">
          <FaUserAstronaut fontSize="45px" color="#ABEEF5" />
          <Text>{10} Th</Text>
          <Text color="#5EE2FF">The Great Player</Text>
        </VStack>
        <VStack justifyContent="space-evenly" alignItems="flex-start">
          <Box display="flex" alignItems="flex-start" flexDir="column">
            <Text fontSize="16px"> Points</Text>
            <Text color="#0BD3FF" fontSize="22px">
              6540000
            </Text>
          </Box>
          <Box display="flex" flexDir="column" alignItems="flex-start">
            <Text>Planet</Text>
            <Text color="#0BD3FF" fontSize="22px">
              5
            </Text>
          </Box>
        </VStack>
      </InfoDiv>
      <InfoDiv
        w="full"
        display="flex"
        flexDir="column"
        alignItems="center"
        color="white"
        paddingY="8px"
        paddingX="16px"
        minH="158px"
      >
        <Heading marginBottom="16px" fontSize="xl">
          The question you stopped at
        </Heading>
        <Text marginBottom="16px">How far is the sun ?</Text>
        <Button
          leftIcon={<VscRocket color={"red"} />}
          colorScheme="teal"
          fontSize="16px"
        >
          Hop back in the shuttle
        </Button>
      </InfoDiv>
      <InfoDiv
        w="full"
        display="flex"
        flexDir="column"
        color="white"
        alignItems="flex-start"
        justifyContent="center"
        paddingX="16px"
      >
        <Text>
          <span style={spanStyle}>48</span> Questions left
        </Text>
        <Text>
          <span style={spanStyle}>12</span> Planets not visited
        </Text>
        <Text>
          <span style={spanStyle}>40000</span> Points to collect
        </Text>
      </InfoDiv>
      <Box
        h="auto"
        animation="all ease-in"
        transitionDuration="800ms"
        color="white"
        display="flex"
        flexDir="row"
        w="full"
        marginTop="12px"
        paddingX={["16px", "24px", "10%"]}
        position="relative"
      >
        <VStack h="85px" w={["140px", "180px", "240px"]}>
          <Text textAlign="left" w="full" fontSize="xl">
            What are you waiting for ?
          </Text>
          <Text textAlign="left" w="full" fontSize="2xl">
            Tap <span style={{ color: "#3CD1DF" }}>Explore</span>{" "}
          </Text>
        </VStack>
        <Box marginTop="73px" marginLeft="-5">
          <svg
            width="118"
            height="16"
            viewBox="0 0 118 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117 0L112.004 2.89304L117.007 5.7735L117 0ZM0.971111 13.3095C41.3603 15.647 67.7333 16.1334 85.065 14.6739C102.367 13.2169 110.813 9.81229 115.15 4.20635L114.359 3.59444C110.305 8.83417 102.263 12.2221 84.9811 13.6774C67.728 15.1303 41.4191 14.6488 1.02889 12.3112L0.971111 13.3095Z"
              fill="white"
            />
          </svg>
        </Box>
        <ThumbButton
          dashboard={false}
          onClick={() => router.push(router.asPath + "/player/levels")}
        />
      </Box>
    </VStack>
  );
};

export default PlayerMobileView;
