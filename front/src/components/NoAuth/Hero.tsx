import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/react";
import React from "react";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <HStack
      backdropBlur="15px"
      spacing={[4, 4, 8, 12]}
      maxW="1080px"
      display="flex"
      flexDir="row"
      marginTop={["48px", "60px", "80px"]}
      paddingX={["8px", "16px"]}
      width="100vw"
      height="fit-content"
      maxH="400px"
      alignItems="flex-start"
      justifyContent="space-evenly"
      color="whiteAlpha.900"
      wrap="nowrap"
    >
      <Box
        borderRadius="14px"
        position="relative"
        width="full"
        minW="200px"
        height="auto"
        minH="150px"
      >
        <Img
          src="/assets/hero.jpg"
          layout="fill"
          w="full"
          maxH={["150px", "250px", "300px", "450px"]}
          height="full"
          borderRadius={27}
        />
      </Box>
      <VStack
        height="100%"
        paddingX={["12px", "20px"]}
        spacing={[8, 14]}
        w="auto"
        justifyContent="space-between"
        paddingBottom={["32px", "32px", "48px"]}
      >
        <Heading fontSize={["sm", "lg", "xl", "3xl", "3xl"]} lineHeight="1.4">
          Welcome to the First Tunisian Astronomical Tournament for the open
          public !
        </Heading>
        <Heading
          margin="auto"
          fontSize={["md", "2xl", "3xl", "4xl", "5xl"]}
          color="#ABEAF2"
        >
          Astro Tournament
        </Heading>
      </VStack>
    </HStack>
  );
};

export default Hero;
