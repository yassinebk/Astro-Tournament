import React, { ReactElement, useEffect, useState } from "react";
import { ADD_QUESTION, ALL_QUESTIONS } from "../../queries/Questions";
import { useMutation, useQuery } from "@apollo/client";
import QuestionFormModal from "./QuestionFormModal";
import { useParams } from "react-router-dom";
import Questions from "./Questions";
import { ALL_LEVELS } from "../../queries/Level";
import { newQuestion, idType } from "../../types";
import { Box, Button } from "@chakra-ui/react";
import { setNotification } from "../../store";

const LevelForm = (): ReactElement => {
  console.log("here");
  const allLevels_result = useQuery(ALL_LEVELS);
  const { id }: idType = useParams();

  const [level, setLevel] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const result = useQuery(ALL_QUESTIONS);

  const [addQuestion, addQuestionResult] = useMutation(ADD_QUESTION, {
    onError: (error: any) =>
      setNotification("ERROR", error.graphQLErrors[0].message as string),
    update: (store, response) => {
      const dataInStore: any = store.readQuery({ query: ALL_QUESTIONS });
      store.writeQuery({
        query: ALL_QUESTIONS,
        data: {
          ...dataInStore,
          allUsers: [...dataInStore.allQuestions, response.data.addQuestion],
        },
      });
    },
  });

  const submitQuestion = (question: newQuestion): void => {
    console.log("newQuestion", question);
    addQuestion({ variables: question });
  };

  const toggleModalOpen = (): void => setModalOpen(true);
  const toggleModalClose = (): void => setModalOpen(false);

  useEffect(() => {
    console.log("data", allLevels_result.data);
    if (!allLevels_result.loading && !allLevels_result.error) {
      const levels = allLevels_result.data.allLevels;

      setLevel(levels[0]);
      //setLevel(levels.find((l:any) => l.id === id));
    }
  }, [allLevels_result.data]);
  useEffect(() => {
    console.log(result.data);
  }, [result.data]);

  const QuestionsDisplay = () => {
    if (result.loading || result.error) {
      return <FetchingQuestions />;
    }
    return (
      <Questions
        questions={result?.data?.allQuestions}
        toggleModalOpen={toggleModalOpen}
      />
    );
  };

  return (
    <Box isFullWidth={true}>
      <QuestionsDisplay />
      <QuestionFormModal
        modalOpen={modalOpen}
        toggleModalOpen={toggleModalOpen}
        onSubmit={submitQuestion}
        error={error}
        onClose={toggleModalClose}
      />
    </Box>
  );
};

const FetchingQuestions = () => {
  return (
    <Box p={32}>
      <Button
        m={[7, 16]}
        isLoading
        colorScheme="purple"
        isFullWidth={true}
        variant="solid"
      >
        Loading Questions
      </Button>
    </Box>
  );
};

export default LevelForm;

/*# We edit the level # I want the level to be drag nd drop of a list of
questions # We have a list of questions to choose from*/
