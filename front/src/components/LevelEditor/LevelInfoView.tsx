import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import React, { useState } from "react";
import {
  Level,
  useAddQuestionToLevelMutation,
  useAllQuestionsQuery,
  useRemoveQuestionFromLevelMutation,
} from "../../generated/graphql";
import { handleGraphlQLErrors } from "../../utils/handleGraphlQLErrors";
import AuthLoadingScreen from "../Auth/AuthLoadingScreen";
import LevelQuestionHorizontalCard from "./LevelQuestionHorizontalCard";

interface LevelInfoViewProps {
  level: Level;
  onClose: () => void;
}

export const LevelInfoView: React.FC<LevelInfoViewProps> = ({
  level,
  onClose,
}) => {
  const [removeQuestionFromLevel, { loading: removeQuestionFromLevelLoading }] =
    useRemoveQuestionFromLevelMutation({
      onError: handleGraphlQLErrors,
      refetchQueries: ["allLevel"],
    });
  const {
    onOpen: onOpenDeletePopup,
    onClose: onCloseDeletePopup,
    isOpen: isOpenDeletePopup,
  } = useDisclosure();

  const [questionsSectionView, setQuestionsSectionViewType] = useState(true);
  const switchBack = () => {
    setQuestionsSectionViewType(!questionsSectionView);
  };

  const { data, loading } = useAllQuestionsQuery();
  const AddQuestionToLevel = () => {
    const [addQuestionToLevel, { loading: addQuestionToLevelLoading }] =
      useAddQuestionToLevelMutation({
        onError: handleGraphlQLErrors,
        refetchQueries: ["allLevel"],
      });

    if (loading) {
      return <AuthLoadingScreen />;
    }
    const questionsToAdd = data.allQuestions.filter(
      (q) => !level.Questions.includes(q)
    );
    return (
      <VStack marginTop="22px">
        <Button
          color="black"
          fontSize="20px"
          onClick={switchBack}
          bgColor="teal.300"
          marginRight="auto"
        >
          Go back
        </Button>
        {/*questions that aren't in the level*/}
        {questionsToAdd.map((q) => (
          <LevelQuestionHorizontalCard
            switchBack={switchBack}
            question={q}
            level={level}
            addQuestionToLevel={addQuestionToLevel}
          />
        ))}
      </VStack>
    );
  };

  return (
    <VStack
      spacing={4}
      minH="500px"
      alignItems="center"
      justifyContent="flex-start"
      paddingBottom="50px"
      borderRadius="15px"
    >
      <IconButton
        bgColor="transparent"
        marginRight="auto"
        icon={<ChevronLeftIcon />}
        aria-label="go back"
        onClick={onClose}
        color="white"
        size="lg"
        fontSize="45px"
      />

      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="full"
        paddingX={4}
      >
        <VStack textAlign="left">
          <Heading w="full" color="#FEF1F1" fontSize="xl" fontWeight="bold">
            Level {level.number}
          </Heading>
          <Text w="full" fontSize="sm" fontWeight="light" color="#65D2D5">
            {level._id}
          </Text>
        </VStack>
        <IconButton
          boxShadow=" 4px 4px 8px rgba(81, 78, 128, 0.67)"
          bgColor="#F07B7B"
          aria-label="delete level"
          color="white"
          fontSize="20px"
          fontWeight="light"
          icon={<DeleteIcon />}
          onClick={onOpenDeletePopup}
          size="lg"
        />
      </HStack>
      <VStack w="80%" h="full" spacing={6}>
        {questionsSectionView ? (
          <>
            <Heading fontSize="xs" fontWeight="hairline" color="white">
              Level Questions
            </Heading>
            <VStack marginBottom={4} spacing={4} minH="370px">
              {level.Questions.map((q) => (
                <LevelQuestionHorizontalCard
                  question={q}
                  level={level}
                  removeQuestionFromLevel={removeQuestionFromLevel}
                />
              ))}
            </VStack>

            <IconButton
              onClick={switchBack}
              colorScheme="teal"
              width="full"
              aria-label="add a question to the level"
              icon={
                <BsPlus
                  size="30px"
                  style={{ backgroundColor: "transparent" }}
                />
              }
            />
          </>
        ) : (
          <AddQuestionToLevel />
        )}
      </VStack>
    </VStack>
  );
};

export default LevelInfoView;
