import { VStack } from "@chakra-ui/layout";
import React from "react";
import CallForPlay from "./CallForPlay";
import CurrentPlayerInGameInfo from "./CurrentPlayerInGameInfo";
import PlayerInfoCard from "./PlayerInfoCard";
import PlayerLastQuestionCard from "./PlayerLastQuestionCard";

interface PlayerHomepageProps {}

const PlayerHomepage: React.FC<PlayerHomepageProps> = ({}) => {
  return (
    <VStack spacing={4} padding="22px">
      <PlayerInfoCard
        rank={0}
        username={"The great player"}
        level={1}
        points={0}
      />
      <PlayerLastQuestionCard question={"welcome"} questionId="3232423C" />
      <CurrentPlayerInGameInfo
        level={0}
        questionsLeft={4}
        pointsToCollect={400000}
      />
      <CallForPlay />
    </VStack>
  );
};

export default PlayerHomepage;
