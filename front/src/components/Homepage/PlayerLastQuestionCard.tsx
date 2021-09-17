import { HStack, VStack } from "@chakra-ui/layout";
import { Heading, Button, Text, Img } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import Image from "next/image";

interface PlayerLastQuestionCardProps {
  question: string;
  questionId: string;
}

export const PlayerLastQuestionCard: React.FC<PlayerLastQuestionCardProps> = ({
  question,
  questionId,
}) => {
  return (
    <VStack
      minH="160px"
      minW="305px"
      borderRadius="11px"
      marginX="auto"
      paddingY="2%"
      paddingX="4%"
      bg="linear-gradient(145.22deg, rgba(194, 194, 194, 0.21) 0%, rgba(245, 245, 245, 0.06) 36.46%, rgba(255, 255, 255, 0.1747) 97.4%), linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 0.0646875) 97.4%, rgba(245, 245, 245, 0.06) 100%)"
      color="white"
      justifyContent="center"
      alignItems="center"
      spacing={4}
    >
      <Heading textAlign="center" fontSize="20px">
        The Question you stopped at
      </Heading>
      <Text fontSize="22px">{question}</Text>
      <NextLink href={`/player/question/${questionId}`}>
        <Button
          minW="185px"
          minH="45px"
          bgColor="#7FD8D8"
          display="flex"
          flexDir="row"
          justifyContent="space-between"
        >
          <Image
            src="/../public/assets/flat-ui_rocket.png"
            width="20px"
            height="20px"
          />
          <Text marginLeft="8px" color="black">
            Hop Back on the Shuttle
          </Text>
        </Button>
      </NextLink>
    </VStack>
  );
};
export default PlayerLastQuestionCard;
