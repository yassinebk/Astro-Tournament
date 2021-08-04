import React, { ReactElement, useState } from "react";
import { newQuestion } from "../../types";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { useInput } from "../utils";

interface PropTypes {
  modalOpen: boolean;
  toggleModalOpen: () => void;
  onSubmit: (question: newQuestion) => void;
  error: string | null;
  onClose: () => void;
}

const QuestionFormModal = ({
  modalOpen,
  toggleModalOpen,
  onSubmit,
  error,
  onClose,
}: PropTypes): ReactElement | null => {
  let toggleError = true;
  const choice = useInput("text");
  const question = useInput("text");
  const answer = useInput("text");
  const value = useInput("number");
  const type = useInput("text");
  const [multipleAnswers, setMultipleAnswers] = useState([]);

  const initialRef: any = React.useRef();
  const finalRef: any = React.useRef();

  const submitModal = () => {
    if (!type.value) return;

    let questionNew: newQuestion = {
      answer: answer.value,
      question: question.value,
      type: type.value,
      value: Number(value.value),
    };
    if (questionNew.type === "SELECT") {
      if (multipleAnswers.length === 0) return;
      questionNew.multipleChoices = multipleAnswers;
    }
    onSubmit(questionNew);
  };
  const closeModal = () => {};
  const addChoice = () => {
    if (choice.value !== "") {
      // @ts-ignore
      setMultipleAnswers(multipleAnswers.concat(choice.value));
      toggleError = false;
      choice.clear();
    } else {
      toggleError = true;
    }
  };

  const removeChoice = (choice: string): void => {
    setMultipleAnswers(multipleAnswers.filter((c) => c !== choice));
  };

  return (
    <>
      <Button variant="solid" onClick={toggleModalOpen}>
        Add Question
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modalOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Question Type</FormLabel>
              <Select
                placeholder="Select question type"
                isRequired
                onChange={type.onChange}
              >
                <option value="FILL"> FILL</option>
                <option value="SELECT">SELECT</option>
                <option value="TF">TF</option>
              </Select>
            </FormControl>
            {type.value !== "" && (
              <>
                <FormControl>
                  <FormLabel>Question</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="put the question you want to ask ! "
                    value={question.value}
                    type={question.type}
                    onChange={question.onChange}
                    id="questionForm-question"
                    name={"question"}
                    isRequired={true}
                    isInvalid={question.value === ""}
                    variant="outline"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Points Value</FormLabel>
                  <Input
                    placeholder="Put the answer to your question"
                    variant="outline"
                    isRequired={true}
                    type={value.type}
                    onChange={value.onChange}
                    defaultValue={0}
                  />
                </FormControl>
                {type.value !== "TF" && (
                  <FormControl mt={4}>
                    <FormLabel>Answer</FormLabel>
                    <Input
                      placeholder="Put the answer to your question"
                      variant="outline"
                      isRequired={true}
                      isInvalid={answer.value === ""}
                      type={answer.type}
                      onChange={answer.onChange}
                    />
                  </FormControl>
                )}
                {type.value === "SELECT" && (
                  <FormControl>
                    <FormLabel>Different Choices</FormLabel>
                    <HStack>
                      <Input
                        placeholder="add a choice here"
                        variant="filled"
                        type={choice.type}
                        onChange={choice.onChange}
                        isInvalid={toggleError}
                        value={choice.value}
                      />
                      <IconButton
                        aria-label="add a choice"
                        onClick={addChoice}
                        colorscheme="green"
                        variant="solid"
                        icon={<AddIcon />}
                      />
                    </HStack>
                    {multipleAnswers.map((c) => (
                      <Tag
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="green"
                      >
                        <TagLabel>{c}</TagLabel>
                        <TagCloseButton onClick={() => removeChoice(c)} />
                      </Tag>
                    ))}
                    <HStack></HStack>
                  </FormControl>
                )}
                {type.value === "TF" && (
                  <FormControl>
                    <RadioGroup
                      defaultValue="2"
                      onChange={(event) => answer.setValue(event)}
                    >
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="green" value="TRUE">
                          True
                        </Radio>
                        <Radio colorScheme="red" value="FALSE">
                          False
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                )}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitModal}>
              Save
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionFormModal;
