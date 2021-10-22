import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  IconButton,
  Text,
  useToken,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  AddQuestionToLevelMutationFn,
  Level,
  Questions,
  RemoveQuestionFromLevelMutationFn,
} from "../../generated/graphql";

interface LevelQuestionHorizontalCardProps {
  question: Questions;
  addQuestionToLevel?: AddQuestionToLevelMutationFn;
  removeQuestionFromLevel?: RemoveQuestionFromLevelMutationFn;
  level: Level;
  switchBack?: (value: React.SetStateAction<boolean>) => void;
}

export const LevelQuestionHorizontalCard: React.FC<LevelQuestionHorizontalCardProps> =
  ({
    removeQuestionFromLevel,
    switchBack,
    question,
    addQuestionToLevel,
    level,
  }) => {
    const onClickRemove = async () => {
      await removeQuestionFromLevel({
        variables: {
          levelId: level._id,
          questionId: question._id,
        },
      });
    };
    const onClickAdd = async () => {
      await addQuestionToLevel({
        variables: {
          levelId: level._id,
          questionId: question._id,
          orderNumber: level.Questions.length + 1,
        },
      });
    };

    return (
      <HStack
        justifyContent={["space-evenly", "space-evenly", "stretch"]}
        alignItems="center"
        bgColor="transparent"
        border="1px solid #6D7E80"
        alignSelf="stretch"
        borderRadius="8px"
        padding="12px"
        minW="330px"
      >
        <VStack w="100%">
          <Heading color="white" fontSize="xl">
            {question.question}
          </Heading>
          <Text fontSize="11px" color="whiteAlpha.900">
            {question._id}
          </Text>
          <span
            style={{
              fontSize: "24px",
              color: useToken("colors", "cyan.800"),
            }}
          >
            {question.points + "  "}
          </span>
        </VStack>
        <HStack justifyContent="space-evenly" w="40%">
          <IconButton
            bgColor={addQuestionToLevel ? "#7FD8D8" : "red.100"}
            aria-label="edit level"
            size="md"
            color={addQuestionToLevel ? "white" : "red.700"}
            icon={addQuestionToLevel ? <AddIcon /> : <CloseIcon />}
            boxShadow=" 4px 4px 8px rgba(81, 78, 128, 0.67)"
            onClick={addQuestionToLevel ? onClickAdd : onClickRemove}
            fontSize="25px"
          />
        </HStack>
      </HStack>
    );
  };

export default LevelQuestionHorizontalCard;
