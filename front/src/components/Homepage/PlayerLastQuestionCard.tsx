import { Button, Heading, Text } from "@chakra-ui/react";
import { VscRocket } from "@react-icons/all-files/vsc/VscRocket";
import React from "react";
import { InfoDiv } from "../WelcomeScreen/InfoDiv";

interface PlayerLastQuestionCardProps {
  question: string;

  questionId: string;
}

export const PlayerLastQuestionCard: React.FC<PlayerLastQuestionCardProps> = ({
  question,
  questionId,
}) => {
  return (
    <InfoDiv
      w="full"
      display="flex"
      flexDir="column"
      alignItems="center"
      color="white"
      paddingY="8px"
      paddingX="16px"
      minH="158px"
    >
      <Heading marginBottom="16px" fontSize="xl">
        The question you stopped at
      </Heading>
      <Text marginBottom="16px">How far is the sun ?</Text>
      <Button
        leftIcon={<VscRocket color={"red"} />}
        colorScheme="teal"
        fontSize="16px"
      >
        Hop back in the shuttle
      </Button>
    </InfoDiv>
  );
};
export default PlayerLastQuestionCard;
