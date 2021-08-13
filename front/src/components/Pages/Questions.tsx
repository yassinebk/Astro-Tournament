import React, { ReactElement, useEffect, useState } from "react";
import { Level, newQuestion, Question } from "../../types";
import { Button, IconButton } from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import QuestionFormModal from "./QuestionFormModal";
import {
  ADD_QUESTION,
  ALL_QUESTIONS,
  REMOVE_QUESTION,
} from "../../queries/Questions";
import { useMutation } from "@apollo/client";
import { setNotification } from "../../store";

interface PropTypes {
  questions: Question[];
  toggleModalOpen?: any;
  level?: Level | null;
  removeQuestionFromLevel?: any;
}

const Questions = ({
  questions,
  level,
  removeQuestionFromLevel,
}: PropTypes): ReactElement<any, any> => {
  const [addQuestion, _addQuestion_result] = useMutation(ADD_QUESTION, {
    onError: (error: any) => {
      console.log(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      const dataInStore: any = store.readQuery({ query: ALL_QUESTIONS });
      store.writeQuery({
        query: ALL_QUESTIONS,
        data: {
          ...dataInStore,
          allQuestions: dataInStore
            ? [...dataInStore.allQuestions, response.data.addQuestion]
            : [response.data.addQuestion],
        },
      });
    },
  });

  const [removeQuestionQuery, removeQuestion_result] = useMutation(
    REMOVE_QUESTION,
    {
      onError: (error: any) => {
        console.log(error.graphQLErrors[0].message);
      },
      update: (store, response) => {
        const dataInStore: any = store.readQuery({ query: ALL_QUESTIONS });
        console.log(dataInStore.allQuestions);
        store.writeQuery({
          query: ALL_QUESTIONS,
          data: {
            ...dataInStore,
            allQuestions: dataInStore
              ? dataInStore.allQuestions?.filter(
                  (q: Question) => q.id !== response.data.removeQuestion.id
                )
              : [],
          },
        });
      },
    }
  );

  const [message, setMessage] = useState("");
  const [modalState, toggleModalState] = useState<boolean>(false);
  const toggleModalOpen = () => {
    toggleModalState(true);
  };
  const toggleModalClose = () => {
    toggleModalState(false);
  };

  const editQuestion = () => {};

  const removeQuestion = (id: string) => {
    removeQuestionQuery({ variables: { id } });
  };

  interface buttonProps {
    question: Question;
  }

  useEffect(() => {
    setNotification("ERROR", message);
  }, [message]);
  const QuestionLevelButton = ({ question }: buttonProps) => {
    return (
      <IconButton
        backgroundColor="red.300"
        aria-label="remove-question"
        icon={<MinusIcon />}
        onClick={() => removeQuestionFromLevel(question)}
      />
    );
  };

  const submitAddQuestion = (question: newQuestion) => {
    console.log("newQuestion", question);
    addQuestion({ variables: question });
  };

  return (
    <div className="table w-auto m-auto p-2">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="border-r p-2">
              <input type="checkbox" />
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                ID
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Question
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Action
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50 text-center">
            <td className="p-2 border-r">#</td>
            <td className="p-2 border-r">
              <input type="text" className="border p-1" />
            </td>
            <td className="p-2 border-r">
              <input type="text" className="border p-1" />
            </td>
            <td className="p-2 border-r">#</td>
          </tr>
          {questions.map((question: Question) => {
            console.log("question", question);
            return (
              <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                <td className="p-2 border-r">
                  <input type="checkbox" />
                </td>
                <td className="p-4 border-r">{question.id}</td>
                <td className="p-4 border-r">{question.question}</td>
                <td className="p-4 w-48">
                  {level ? (
                    <QuestionLevelButton question={question} />
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        colorscheme="purple"
                        backgroundColor="purple.300"
                        onClick={() => removeQuestion(question.id)}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <QuestionFormModal
        onSubmit={submitAddQuestion}
        onClose={toggleModalClose}
        modalOpen={modalState}
        toggleModalOpen={toggleModalOpen}
        error={message}
      />
    </div>
  );
};

export default Questions;
