import { Text, VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import React from "react";
import { InfoDiv } from "../WelcomeScreen/InfoDiv";

interface PlayerInfoCardProps {
  rank: number;
  username: string;
  level: number;
  points: number;
}

export const PlayerInfoCard: React.FC<PlayerInfoCardProps> = ({
  level,
  rank,
  username,
  points,
}) => {
  const fontSizeHeading1 = ["18px", "18px", "24px", "30px"];
  return (
    <InfoDiv
      display="flex"
      flexDir="row"
      justifyContent="space-evenly"
      width="full"
      paddingY="16px"
      color="white"
    >
      <VStack fontSize={fontSizeHeading1} fontWeight="800">
        <FaUserAstronaut fontSize="45px" color="#ABEEF5" />
        <Text>{10} Th</Text>
        <Text color="#5EE2FF">The Great Player</Text>
      </VStack>
      <VStack justifyContent="space-evenly" alignItems="flex-start">
        <Box
          display="flex"
          alignItems="flex-start"
          flexDir="column"
          fontSize={["16px", "16px", "32px"]}
        >
          <Text> Points</Text>
          <Text color="#0BD3FF" fontSize={["22px", "28px", "32px"]}>
            6540000
          </Text>
        </Box>
        <Box display="flex" flexDir="column" alignItems="flex-start">
          <Text fontSize={["16px", "16px", "32px"]}>Planet</Text>
          <Text color="#0BD3FF" fontSize={["22px", "28px", "32px"]}>
            5
          </Text>
        </Box>
      </VStack>
    </InfoDiv>
  );
};

export default PlayerInfoCard;
