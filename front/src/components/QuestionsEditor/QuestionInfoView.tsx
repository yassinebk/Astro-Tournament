import { CheckIcon, ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { HStack, Text, VStack, Wrap } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tag,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Questions, useEditQuestionMutation } from "../../generated/graphql";
import { handleGraphlQLErrors } from "../../utils/handleGraphlQLErrors";
import EditableControls from "../EditControls";
import RadioCard from "./QuestionTrueAndFalseRadioCard";

interface QuestionInfoViewProps {
  question: Questions;
  onClose: () => void;
}

const QuestionInfoView: React.FC<QuestionInfoViewProps> = ({
  question,
  onClose,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "True-False",
    defaultValue: "True",
    onChange: (value) => setAnswerInput(value),
  });
  const True = getRadioProps({
    value: "true",

    defaultChecked: question.answer === "true",
  });
  const False = getRadioProps({
    value: "false",
    defaultChecked: question.answer === "false",
  });

  const [choiceInputValue, setChoiceInputValue] = useState("");
  const [choices, setChoices] = useState(question.choices);
  const [answerInput, setAnswerInput] = useState(question.answer);

  const [questionNewPoints, setQuestionNewPoints] = useState(question.points);
  const [editQuestion, { data, loading }] = useEditQuestionMutation({
    onError: handleGraphlQLErrors,
    notifyOnNetworkStatusChange: true,
    refetchQueries: ["allQuestions"],
  });

  const onClickAddChoice = ({}) => {
    setChoices(choices.concat(choiceInputValue));
    setChoiceInputValue("");
  };
  const confirmEditingQuestion = async () => {
    await editQuestion({
      variables: {
        newInfos: {
          answer: answerInput,
          choices: choices,
          points: questionNewPoints,
        },
        questionId: question._id,
      },
    });
    await setTimeout(() => onClose(), 1000);
  };

  const handleChangeQuestionAnswer = ({ target }) => {
    setAnswerInput(target.value);
  };

  const MultipleChoicesDisplay = () => {
    return (
      <Wrap flexDir="row">
        {choices.map((c) => {
          return (
            <Tag
              colorScheme="teal"
              display="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="center"
            >
              <Text>{c}</Text>
              <IconButton
                bgColor="transparent"
                _active={{ bgColor: "transparent", color: "teal.700" }}
                _focus={{ bgColor: "transparent", color: "teal.700" }}
                onClick={() => {
                  setChoices(choices.filter((choice) => choice !== c));
                  /* send an edit request to edit the question by filtering the selected tag off*/
                }}
                icon={
                  <CloseIcon
                    bgColor="transparent"
                    _pressed={{ bgColor: "transparent", color: "teal.700" }}
                  />
                }
                aria-label="remove choice"
                size="lg"
              />
            </Tag>
          );
        })}
      </Wrap>
    );
  };
  return (
    <VStack
      spacing={12}
      borderRadius="15px"
      backdropFilter="blur(18px)"
      border="1px solid #9F9696"
      minW="328px"
      paddingY="24px"
      paddingX="16px"
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
      <VStack marginRight="auto" alignItems="flex-start">
        <Heading fontSize="3xl" fontWeight="bold">
          {" "}
          {question.question}
        </Heading>
        <Text color="#65D2D5" as="h2" fontSize="lg">
          ID:{question._id}
        </Text>
      </VStack>
      <VStack w="100%" spacing={12}>
        <Box
          w="full"
          bg="linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))"
          padding="8px"
        >
          <Text color="teal.400" textShadow="2xl">
            Answer :
          </Text>
          {question.answer === "false" || question.answer === "true" ? (
            <HStack>
              <RadioCard
                key={"true"}
                {...True}
                true={true}
                checked={answerInput === "true"}
              >
                <HStack w="100px" h="40px">
                  <CheckIcon />
                  <Text> True</Text>
                </HStack>
              </RadioCard>
              <RadioCard
                key={"false"}
                {...False}
                true={false}
                checked={answerInput === "false"}
              >
                <HStack w="100px" h="40px">
                  <CloseIcon />
                  <Text>False</Text>
                </HStack>
              </RadioCard>
            </HStack>
          ) : (
            <Editable
              alignItems="center"
              display="flex"
              flexDir="row"
              justifyContent="space-between"
              textAlign="center"
              defaultValue={answerInput}
              fontSize="2xl"
              isPreviewFocusable={false}
              maxW="100%"
              minW="100%"
            >
              <EditablePreview fontSize="16px" marginRight="2px" w="80%" />
              <EditableInput
                fontSize="16px"
                onChange={handleChangeQuestionAnswer}
              />
              <EditableControls />
            </Editable>
          )}
        </Box>
        {question.questionType === "MULTIA" && (
          <Box
            w="full"
            bg="linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))"
            padding="8px"
          >
            <Text color="teal.400" textShadow="2xl">
              Multiple Choices :
            </Text>
            <Editable
              alignItems="center"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
              paddingY="4px"
              textAlign="center"
              marginTop="26px"
              fontSize="2xl"
              isPreviewFocusable={false}
              maxW="100%"
              minW="100%"
            >
              <EditableInput
                h="45px"
                value={choiceInputValue}
                onChange={({ target }) => setChoiceInputValue(target.value)}
                marginBottom="6px"
                fontSize="16px"
                w="full"
                borderColor="red"
              />
              <HStack justifyContent="space-between" w="full">
                <EditablePreview
                  fontSize="16px"
                  marginRight="2px"
                  w="80%"
                  as={MultipleChoicesDisplay}
                />

                <EditableControls onClick={onClickAddChoice} />
              </HStack>
            </Editable>
          </Box>
        )}

        <FormControl w="100%" maxW="700px">
          <FormLabel htmlFor="questionPoints" color="teal.400" textShadow="2xl">
            Points
          </FormLabel>
          <NumberInput
            maxW="700px"
            onChange={async (value) => setQuestionNewPoints(parseInt(value))}
            defaultValue={question.points}
            id="questionPoints"
            aria-label="questions's points"
          >
            <NumberInputField h={"50px"} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={confirmEditingQuestion}
          isLoading={loading}
        >
          Confirm
        </Button>
      </VStack>
    </VStack>
  );
};

export default QuestionInfoView;
