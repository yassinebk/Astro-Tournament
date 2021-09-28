import { useApolloClient } from "@apollo/client";
import {
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Question_Type, useAddQuestionMutation } from "../../generated/graphql";
import Toast from "../ErrorPopup";
import FullPageModal from "../FullPageModal";
import InputField from "../InputField";
import { SetFormQuestionTypeView } from "./SetFormQuestionTypeView";
interface NewQueestionFormProps {
  onClose: () => void;
  isOpen: boolean;
}

const NewQuestionForm: React.FC<NewQueestionFormProps> = ({
  isOpen,
  onClose,
}) => {
  const client = useApolloClient();
  const [questionViewType, setQuestionType] = useState("TFANSWER");
  const [addQuestion, { data, loading, error }] = useAddQuestionMutation({
    notifyOnNetworkStatusChange: true,
    refetchQueries: ["allQuestions"],
    onError: ({ graphQLErrors, networkError }) => {
      Toast({
        popupMessage: graphQLErrors[0].message,
        popupTitle: graphQLErrors[0].name,
        popupType: "error",
      });
    },
  });

  const validationSchema = Yup.object().shape({
    question: Yup.string(),
    answer: Yup.string().min(1, "is This answer empty ? "),
    multipleChoices: Yup.string().min(
      1,
      "Name should be at least 1 character long"
    ),
  });
  const inputHeight = "60px";

  return (
    <FullPageModal
      onClose={onClose}
      isOpen={isOpen}
      blurred={true}
      ownBackButton={false}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          answer: "",
          question: "",
          points: 100,
          questionType: questionViewType,
          choices: [],
        }}
        validateOnChange={true}
        onSubmit={async (values, { setErrors }) => {
          console.log("values", values);
          await addQuestion({
            variables: {
              options: {
                answer: values.answer,
                points: values.points,
                question: values.question,
                questionType: values.questionType as Question_Type,
                choices: values.choices,
              },
            },
          });
          onClose();
        }}
      >
        {({ isSubmitting, values, validateOnChange, setValues }) => {
          return (
            <Form
              color="white"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                flexWrap: "nowrap",
                marginTop: "20px",
                alignItems: "center",
                height: "auto",
              }}
            >
              <VStack
                justifyContent="space-between"
                w="100%"
                alignItems="center"
                paddingX="2%"
                maxW="800px"
                minH="500px"
                spacing={30}
              >
                <VStack spacing={4} h="auto" w="full">
                  <Select
                    maxW="700px"
                    h="55px"
                    onChange={({ target }) => {
                      setQuestionType(
                        target.selectedOptions[
                          target.selectedIndex === undefined
                            ? target.selectedIndex
                            : 0
                        ].value
                      );
                      console.log(target.selectedIndex);
                      console.log("questionType", questionViewType);

                      setValues({
                        ...values,
                        questionType:
                          questionViewType === "TFANSWER"
                            ? "ANSWER"
                            : questionViewType,
                      });
                    }}
                    color="white"
                    bgColor="black"
                    size="lg"
                    value={questionViewType}
                  >
                    <option
                      color="white"
                      value="TFANSWER"
                      style={{ backgroundColor: "transparent" }}
                    >
                      True and False
                    </option>
                    <option
                      style={{ backgroundColor: "transparent" }}
                      value="MULTIA"
                    >
                      Multiple Choices
                    </option>
                    <option
                      style={{ backgroundColor: "transparent" }}
                      value="ANSWER"
                    >
                      Type in answer
                    </option>
                  </Select>

                  <InputField
                    marginTop="40px"
                    name="question"
                    placeholder="Question"
                    label="Question"
                    type="text"
                    color="white"
                    h={inputHeight}
                    w="100%"
                    height="50px"
                    bgColor="transparent"
                  />

                  <FormControl w="100%" maxW="700px">
                    <FormLabel
                      htmlFor="questionPoints"
                      fontSize="xl"
                      fontWeight="normal"
                      textTransform="capitalize"
                      letterSpacing="wide"
                    >
                      Points
                    </FormLabel>
                    <NumberInput
                      maxW="700px"
                      onChange={async (value) => {
                        setValues({ ...values, points: parseInt(value) });
                      }}
                      value={values.points}
                      defaultValue={values.points}
                      id="questionPoints"
                      aria-label="questions' points"
                    >
                      <NumberInputField h={inputHeight} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <SetFormQuestionTypeView
                    setValues={setValues}
                    values={values}
                    viewType={questionViewType}
                    inputHeight={inputHeight}
                  />
                </VStack>
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="teal"
                  variant="outline"
                  bgColor="#7FD8D8"
                  minH="50px"
                  fontSize="2xl"
                  w={["full"]}
                  h="60px"
                >
                  Create Question
                </Button>
              </VStack>
            </Form>
          );
        }}
      </Formik>
    </FullPageModal>
  );
};

export default NewQuestionForm;
