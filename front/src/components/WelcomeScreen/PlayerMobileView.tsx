import { VStack } from "@chakra-ui/layout";
import React from "react";
import CallForPlay from "../Homepage/CallForPlay";
import PlayerInfoCard from "../Homepage/PlayerInfoCard";
import PlayerLastQuestionCard from "../Homepage/PlayerLastQuestionCard";

const PlayerMobileView = () => {
  return (
    <VStack
      display={["flex", "flex", "flex", "none"]}
      maxW="800px"
      flexDir="column"
      alignContent="center"
      marginTop="40px"
      paddingX="24px"
      paddingY="24px"
      spacing={4}
      w="100vw"
    >
      <PlayerInfoCard rank={0} username={""} level={0} points={0} />
      <PlayerLastQuestionCard question={""} questionId={""} />
      <CallForPlay />
    </VStack>
  );
};

export default PlayerMobileView;
