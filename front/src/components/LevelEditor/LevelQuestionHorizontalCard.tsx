import { Box } from "@chakra-ui/react";
import React from "react";
import { Questions } from "../../generated/graphql";

interface LevelQuestionHorizontalCardProps {
  question: Questions;
}

export const LevelQuestionHorizontalCard: React.FC<LevelQuestionHorizontalCardProps> =
  ({ question }) => {
    return <Box></Box>;
  };

export default LevelQuestionHorizontalCard;
