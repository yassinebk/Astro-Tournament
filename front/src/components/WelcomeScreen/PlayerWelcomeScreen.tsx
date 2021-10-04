import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import { VscRocket } from "@react-icons/all-files/vsc/VscRocket";
import React from "react";
import { InfoDiv } from "./InfoDiv";

interface PlayerWelcomeScreenProps {}

const PlayerWelcomeScreen: React.FC<PlayerWelcomeScreenProps> = ({}) => {
  const spanStyle = {
    color: "#0BD3FF",
    fontSize: "24px",
    fontWeight: "",
  };
  return (
    <VStack
      flexDir="column"
      alignContent="center"
      marginTop="40px"
      paddingX="24px"
      spacing={6}
      w="100vw"
    >
      <InfoDiv
        display="flex"
        flexDir="row"
        justifyContent="space-evenly"
        width="90vw"
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
        <Heading marginBottom="24px" fontSize="xl">
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
        minH="204px"
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
    </VStack>
  );
};

export default PlayerWelcomeScreen;
