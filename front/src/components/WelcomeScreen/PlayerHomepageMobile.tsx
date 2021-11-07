import { VStack } from "@chakra-ui/layout";
import React from "react";
import CallForPlay from "../Homepage/CallForPlay";
import PlayerInfoCard from "../Homepage/PlayerInfoCard";
import PlayerLastQuestionCard from "../Homepage/PlayerLastQuestionCard";

const PlayerHomepageMobile = () => {
  return (
    <VStack
      display={["flex", "flex", "flex", "none"]}
      flexDir="column"
      alignContent="center"
      marginTop="40px"
      paddingX="24px"
      paddingY="24px"
      justifyContent="space-around"
      w="100vw"
      maxW="600px"
      h="100%"
      flex={1}
    >
      <PlayerInfoCard
        rank={0}
        username={"The great player"}
        level={0}
        points={0}
      />
      <PlayerLastQuestionCard question={"Where is the sun?"} questionId={""} />
      <CallForPlay />
    </VStack>
  );
};

export default PlayerHomepageMobile;
