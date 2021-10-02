import { Button } from "@chakra-ui/button";
import { Box, Circle, Heading, HStack } from "@chakra-ui/layout";
import React from "react";
import { IoTelescopeSharp } from "@react-icons/all-files/io5/IoTelescopeSharp";
import Icon from "@chakra-ui/icon";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";

interface CallForPlayProps {}

export const CallForPlay: React.FC<CallForPlayProps> = ({}) => {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <HStack
      maxW="100vw"
      justifyContent="space-evenly"
      alignContent="flex-end"
      paddingRight="20px"
    >
      <Box position="relative" maxW="275px">
        <Box
          as="section"
          color="white"
          paddingLeft="8%"
          maxW="80%"
          fontSize="18px"
          minW="187px"
        >
          <Heading>
            What are you waiting for press Tap{" "}
            <span style={{ color: "#3CD1DF" }}>Explore !</span>
          </Heading>
        </Box>
        <Box position="absolute" right={0} bottom={8}>
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
      </Box>
      <NextLink href={router.asPath.replace("dashboard", "player/levels")}>
        <Button
          _focus={{ bgColor: "transparent" }}
          _hover={{ bgColor: "transparent" }}
          _active={{ bgColor: "transparent" }}
          style={{ marginTop: "auto" }}
          fontSize="90px"
          bgColor="transparent"
          w="auto"
          h="auto"
        >
          <Circle size="90px" bgColor="#3DDEED">
            <Circle
              size="70px"
              padding="10px"
              bg=" linear-gradient(94.71deg, rgba(52, 15, 64, 0.72) 0%, #0C818F 100%)"
              color="white"
            >
              <IoTelescopeSharp />
            </Circle>
          </Circle>
        </Button>
      </NextLink>
    </HStack>
  );
};

export default CallForPlay;
