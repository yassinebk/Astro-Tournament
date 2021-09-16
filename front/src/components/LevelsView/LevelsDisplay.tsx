import { VStack } from "@chakra-ui/react";
import React from "react";
import { Level } from "../../generated/graphql";

interface LevelsDisplayProps {
  levels: Array<Level>;
}

export const LevelsDisplay: React.FC<LevelsDisplayProps> = ({}) => {
  return <VStack></VStack>;
};

export default LevelsDisplay;
