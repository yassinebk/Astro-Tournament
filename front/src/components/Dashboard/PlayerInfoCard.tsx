import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

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
  return (
    <HStack
      w="100vw"
      bg="linear-gradient(145.22deg, rgba(194, 194, 194, 0.21) 0%, rgba(245, 245, 245, 0.06) 36.46%, rgba(255, 255, 255, 0.1747) 97.4%), linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 0.0646875) 97.4%, rgba(245, 245, 245, 0.06) 100%)"
      marginTop="37px"
      fontSize="26px" //fontSize="2xl"
      justifyContent="space-evenly"
      alignItems="flex-start"
    >
      <VStack alignItems="center" paddingX="4%" paddingY="12px" w="100%">
        <FontAwesomeIcon icon={faUserAstronaut} color="#b2f8ff" size="2x" />
        <Flex flexDir="column" marginTop={1} fontSize="22px">
          <Heading color="#1EFFFF" fontWeight={700} textAlign="center">
            {rank}
            <span style={{ fontSize: 19 }}> TH</span>
          </Heading>
          <Heading textAlign="center" color="#5EE2FF" fontSize="19px">
            {username}
          </Heading>
        </Flex>
      </VStack>
      <VStack alignItems="flex-start" w="100%" color="white" paddingY="22px">
        <Text>
          Points: <span style={{ color: "#0BD3FF" }}>{points}</span>
        </Text>
        <Text>
          Level:{" "}
          <span
            style={{ color: "#67EFF8", fontWeight: "bold", fontSize: "26px" }}
          >
            {level}{" "}
          </span>
        </Text>
      </VStack>
    </HStack>
  );
};

export default PlayerInfoCard;
