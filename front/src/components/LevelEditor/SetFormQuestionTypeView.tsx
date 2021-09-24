import { CheckIcon, CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Box, HStack, Text, Wrap } from "@chakra-ui/layout";
import {
  FormLabel,
  IconButton,
  Input,
  Tag,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InputField from "../InputField";

type ViewType = "TFANSWER" | "MULTIA" | "ANSWER";
interface SetFormQuestionTypeViewProps {
  viewType: string;
  setValues: (
    values: React.SetStateAction<{
      answer: string;
      question: string;
      points: number;
      questionType: string;
      choices: any[];
    }>
  ) => void;
  values: {
    answer: string;
    question: string;
    points: number;
    questionType: string;
    choices: any[];
  };
  inputHeight: string | string[];
}

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: props.true ? "green.600" : "red.600",
          color: "white",
          borderColor: "gray.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
const isViewType = (arg: string): arg is ViewType => {
  if (typeof arg !== "string") return false;
  if (arg === "TFANSWER" || arg === "MULTIA" || arg === "ANSWER") return true;
};
export const SetFormQuestionTypeView: React.FC<SetFormQuestionTypeViewProps> =
  ({ viewType, inputHeight, setValues, values }) => {
    const onChangeTrueAndFalse = (value) => {
      setValues({ ...values, answer: value });
    };

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: "True-False",
      defaultValue: "True",
      onChange: onChangeTrueAndFalse,
    });
    const [choices, setChoicesList] = useState([]);
    const [currentNewMCValue, setCurrentNewMCValue] = useState(""); //MC = multiple Choices
    const True = getRadioProps({ value: "true" });
    const False = getRadioProps({ value: "false" });
    if (!isViewType(viewType)) {
      return null;
    }
    switch (viewType) {
      case "TFANSWER":
        return (
          <HStack paddingTop="16px">
            <RadioCard key={"true"} {...True} true={true}>
              <HStack w="100px" h="40px">
                <CheckIcon />
                <Text> True</Text>
              </HStack>
            </RadioCard>
            <RadioCard key={"false"} {...False} true={false}>
              <HStack w="100px" h="40px">
                <CloseIcon />
                <Text>False</Text>
              </HStack>
            </RadioCard>
          </HStack>
        );

      case "MULTIA":
        return (
          <Box w="100%">
            <FormLabel
              htmlFor={"multipleChoices"}
              fontSize="xl"
              fontWeight="normal"
              textTransform="capitalize"
              letterSpacing="wide"
            >
              Multiple Choices
            </FormLabel>
            <HStack border="white 1px solid" borderRadius={5} h="60px" w="full">
              <Input
                id="multipleChoices"
                borderSize={0}
                borderColor="transparent"
                onChange={({ target }) => setCurrentNewMCValue(target.value)}
                value={currentNewMCValue}
              />
              <IconButton
                onClick={() => {
                  setChoicesList(choices.concat(currentNewMCValue));
                  setCurrentNewMCValue("");
                }}
                icon={<PlusSquareIcon />}
                aria-label="Add choice"
                colorScheme="teal"
                bgColor="transparent"
              />
            </HStack>
            <Wrap w="full" marginTop="12px" maxW="100%">
              {choices.map((c) => {
                return (
                  <Tag
                    colorScheme="teal"
                    display="flex"
                    flexDir="row"
                    justifyContent="space-between"
                  >
                    {c}
                    <IconButton
                      _focus={{
                        bgColor: "transparent",
                        color: "purple.400",
                      }}
                      _active={{
                        bgColor: "transparent",
                      }}
                      _hover={{
                        bgColor: "transparent",
                      }}
                      bgColor="transparent"
                      aria-label="delete choice"
                      icon={<CloseIcon />}
                      onClick={() => {
                        if (currentNewMCValue.length === 0) {
                          /*
                    SetError
                    */
                        }
                        setChoicesList(
                          choices.filter((choice) => c !== choice)
                        );
                      }}
                    />
                  </Tag>
                );
              })}
            </Wrap>
          </Box>
        );
      case "ANSWER":
        return (
          <InputField
            h={inputHeight}
            marginTop="40px"
            name="answer"
            placeholder="Answer"
            label="Answer"
            type="text"
            color="white"
            w="100%"
            bgColor="transparent"
          />
        );

      default:
        return <Box></Box>;
    }
  };
