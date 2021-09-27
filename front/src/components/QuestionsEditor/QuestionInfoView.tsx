import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Box,
  Button,
  ButtonGroup,
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
  useEditableControls,
} from "@chakra-ui/react";
import React from "react";
import { Questions } from "../../generated/graphql";

interface QuestionInfoViewProps {
  question: Questions;
  onClose: () => void;
}

export const QuestionInfoView: React.FC<QuestionInfoViewProps> = ({
  question,
  onClose,
}) => {
  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="confirm edit"
          size="lg"
          bgColor="transparent"
          icon={<CheckIcon fontSize="20px" />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="close edit"
          bgColor="transparent"
          size="lg"
          icon={<CloseIcon fontSize="20px" />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" marginLeft="auto">
        <IconButton
          bgColor="transparent"
          aria-label="edit"
          size="lg"
          icon={<EditIcon fontSize="30px" />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  };
  return (
    <VStack
      spacing={12}
      minW="328px"
      border="1px solid white"
      borderRadius="11.73px"
      paddingY="24px"
      paddingX="16px"
    >
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
          <Editable
            alignItems="center"
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            textAlign="center"
            defaultValue={question.answer}
            fontSize="2xl"
            isPreviewFocusable={false}
            maxW="100%"
            minW="100%"
          >
            <EditablePreview fontSize="16px" marginRight="2px" w="80%" />
            <EditableInput fontSize="16px" />
            <EditableControls />
          </Editable>
        </Box>
        )
        <FormControl w="100%" maxW="700px">
          <FormLabel htmlFor="questionPoints" color="teal.400" textShadow="2xl">
            Points
          </FormLabel>
          <NumberInput
            maxW="700px"
            onChange={async (value) => {}}
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
        <Box w="full">
          <Text color="teal.400" textShadow="2xl">
            Level
          </Text>
          <Editable
            alignItems="center"
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            textAlign="center"
            defaultValue={question?.orderNumber?.toString()}
            fontSize="2xl"
            isPreviewFocusable={false}
            maxW="100%"
            minW="100%"
          >
            <EditablePreview fontSize="16px" marginRight="2px" w="80%" />
            <EditableInput fontSize="16px" />
            <EditableControls />
          </Editable>
        </Box>
        <Button colorScheme="teal" size="lg">
          Confirm
        </Button>
      </VStack>
    </VStack>
  );
};

export default QuestionInfoView;
