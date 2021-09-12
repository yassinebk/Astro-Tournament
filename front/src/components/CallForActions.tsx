import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import { IoLogoAndroid } from "@react-icons/all-files/io/IoLogoAndroid";

interface CallForActionsProps {}

const CallForActions: React.FC<CallForActionsProps> = ({}) => {
  return (
    <Box
      display="flex"
      paddingTop="10%"
      maxH="300px"
      h="auto"
      flexDir={["column", "column", "column", "row"]}
      marginX="auto"
      marginBottom="120px"
      alignItems="center"
      w="100vw"
      maxW="1260px"
      minH="240px"
      justifyContent="space-around"
    >
      <Box
        fontSize={["3xl", "4xl", "5xl", "6xl"]}
        marginBottom={["16px", "16px", "24px", "0"]}
      >
        <Heading fontSize="inherit">
          Hop in ,
          <br />
          The Launch is Near !
        </Heading>
      </Box>
      <VStack spacing={5} maxW="600px">
        <HStack justifyContent="space-evenly" w="auto" spacing={4}>
          <Button
            variant="solid"
            colorScheme="purple"
            w={["40vw", "40vw", "40vw", "250px"]}
            h={["50px"]}
            fontSize="2xl"
          >
            Signup
          </Button>
          <Button
            fontSize="2xl"
            h={["50px"]}
            variant="outline"
            colorScheme="purple"
            w={["40vw", "40vw", "40vw", "250px"]}
          >
            Signup
          </Button>
        </HStack>
        <Button
          bgGradient="linear-gradient(to-r, #00b09b, #96c93d)"
          border="0.2px solid purple"
          w="full"
          aria-label="a button to install the app"
          leftIcon={<IoLogoAndroid />}
          variant="solid"
          h={["60px"]}
          fontSize="xl"
        >
          Install the app !
        </Button>
      </VStack>
    </Box>
  );
};

export default CallForActions;
