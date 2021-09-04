import React, { useEffect, useState } from "react";
import { ADD_QUESTION, ALL_QUESTIONS } from "../../queries/Questions";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import QuestionFormModal from "./QuestionFormModal";
import { useParams } from "react-router-dom";
import Questions from "./Questions";
import { newQuestion, idType, Level } from "../../types";
import { Box, Button } from "@chakra-ui/react";
import { setNotification } from "../../store";
import { levelsState } from "../../store";
// interface PropTypes {
//   level: Level;
// }

const LevelForm = (): JSX.Element => {
  console.log("here");
  const { id }: idType = useParams();
  const allLevels = useReactiveVar(levelsState);
  const [level, setLevel] = useState<Level | undefined | null>(null);
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
    if (id) setLevel(allLevels.find((l) => l.id === id));
    console.log(level);
  }, [allLevels]);

  const QuestionsDisplay = () => {
    if (result.loading || result.error) {
      return <FetchingQuestions />;
    }
    return (
      <Questions
        questions={result?.data?.allQuestions}
        toggleModalOpen={toggleModalOpen}
        level={level}
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
