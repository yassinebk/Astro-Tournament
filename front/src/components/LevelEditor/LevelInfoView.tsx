import { Box, HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import { Level } from "../../generated/graphql";
import QuestionHorizCard from "./QuestionHorizCard";

interface LevelInfoViewProps {
  level: Level;
  isOpen: boolean;
  onClose;
}

export const LevelInfoView: React.FC<LevelInfoViewProps> = ({
  level,
  isOpen,
  onClose,
}) => {
  return (
    <VStack
      bg="linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 0.0646875) 97.4%, rgba(245, 245, 245, 0.06) 100%)"
      border="1px solid #9F9696"
      alignItems="center"
      backdropFilter="blur(18px)"
      justifyContent="center"
      borderRadius="15px"
    >
      <HStack></HStack>
      <VStack>
        <QuestionHorizCard question={level.Questions[0]} />
      </VStack>
    </VStack>
  );
};

export default LevelInfoView;
