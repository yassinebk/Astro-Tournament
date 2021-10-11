import { VStack } from "@chakra-ui/react";
import React from "react";
import { Level } from "../../generated/graphql";
import ScrollToTopBtn from "../ScrollToTopBtn";
import LevelCard from "./LevelCard";

interface LevelsDisplayProps {
  levels: Array<Level>;
}

export const LevelsDisplay: React.FC<LevelsDisplayProps> = ({ levels }) => {
  return (
    <VStack overflow="scroll" style={{ scrollBehavior: "smooth" }} spacing={8}>
      {levels.map((l) => (
        <LevelCard level={l} key={l._id} answeredQuestions={40} />
      ))}
    </VStack>
  );
};

export default LevelsDisplay;
