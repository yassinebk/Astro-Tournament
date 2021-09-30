import { useApolloClient } from "@apollo/client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Heading, HStack, IconButton, Text,
  useDisclosure, useToken, VStack
} from "@chakra-ui/react";
import React from "react";
import { Questions } from "../../generated/graphql";
import FullPageModal from "../FullPageModal";
import ConfirmDialog from "../LevelEditor/ConfirmDialog";
import QuestionInfoView from "./QuestionInfoView";

interface QuestionHorizontalCardProps {}
interface QuestionHorizontalCardProps {
  question: Questions;
  deleteQuestion;
}

export const QuestionHorizontalCard: React.FC<QuestionHorizontalCardProps> = ({
  question,
  deleteQuestion,
}) => {
  const client = useApolloClient();
  const {
    onOpen: onOpenDeletePopup,
    onClose: onCloseDeletePopup,
    isOpen: isOpenDeletePopup,
  } = useDisclosure();
  const {
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
    isOpen: isOpenEditModal,
  } = useDisclosure();
  const onCloseDeleteQuestion = async () => {
    await deleteQuestion({ variables: { questionId: question._id } });
    onCloseDeletePopup();
  };

  return (
    <>
      <FullPageModal
        ownBackButton={true}
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
      >
        <QuestionInfoView question={question} onClose={onCloseEditModal} />
      </FullPageModal>
      <ConfirmDialog
        onClose={async () => await onCloseDeleteQuestion()}
        text={"Delete Level"}
        isOpen={isOpenDeletePopup}
        callback={async () => {
          try {
            await deleteQuestion({
              variables: {
                questionId: question._id,
              },
            });
          } catch (error) {
            /*Show Error popup*/
          }
        }}
      />
      {/* <LevelInfoView level={level} /> */}
      <HStack
        justifyContent={["space-evenly", "space-evenly", "stretch"]}
        alignItems="center"
        bgColor="transparent"
        border="1px solid #6D7E80"
        alignSelf="stretch"
        borderRadius="8px"
        padding="20px"
        minW="330px"
        minH="71px"
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
            bgColor="#7FD8D8"
            aria-label="edit level"
            size="lg"
            icon={<EditIcon />}
            boxShadow=" 4px 4px 8px rgba(81, 78, 128, 0.67)"
            onClick={() => onOpenEditModal()}
            fontSize="25px"
          />
          <IconButton
            boxShadow=" 4px 4px 8px rgba(81, 78, 128, 0.67)"
            bgColor="#F07B7B"
            aria-label="delete level"
            color="white"
            fontSize="20px"
            fontWeight="light"
            icon={<DeleteIcon />}
            onClick={() => onOpenDeletePopup()}
            size="lg"
          />
        </HStack>
      </HStack>
    </>
  );
};

export default QuestionHorizontalCard;
