import { Text, VStack } from "@chakra-ui/layout";
import React from "react";

interface CallForPlayProps {
  level: number;
  questionsLeft: number;
  pointsToCollect: number;
}

const Info = ({ text, number }) => {
  return (
    <Text fontSize="16px" fontWeight="bold" textAlign="left">
      <span style={{ color: "#7FD8D8" }}>{number}</span> {" " + text}
    </Text>
  );
};
export const CurrentPlayerInGameInfo: React.FC<CallForPlayProps> = ({
  pointsToCollect,
  level,
  questionsLeft,
}) => {
  return (
    <VStack
      minH="204px"
      minW="300px"
      borderRadius="11px"
      marginX="auto"
      paddingX="4%"
      bg="linear-gradient(145.22deg, rgba(194, 194, 194, 0.21) 0%, rgba(245, 245, 245, 0.06) 36.46%, rgba(255, 255, 255, 0.1747) 97.4%), linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 0.0646875) 97.4%, rgba(245, 245, 245, 0.06) 100%)"
      color="white"
      justifyContent="center"
      alignItems="flex-start"
      spacing={8}
    >
      <Info number={questionsLeft} text="Questions Left" />
      <Info number={level} text="Planets Not Visited" />
      <Info number={pointsToCollect} text="Planet To visit" />
    </VStack>
  );
};

export default CurrentPlayerInGameInfo;
