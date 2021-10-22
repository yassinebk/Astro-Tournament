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
import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import RadioCard from "./QuestionTrueAndFalseRadioCard";

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

const isViewType = (arg: string): arg is ViewType => {
  if (typeof arg !== "string") return false;
  if (arg === "TFANSWER" || arg === "MULTIA" || arg === "ANSWER") return true;
};
export const SetFormQuestionTypeView: React.FC<SetFormQuestionTypeViewProps> =
  ({ viewType, inputHeight, setValues, values }) => {
    const onChangeTrueAndFalse = (value) => {
      setValues({ ...values, answer: value });
    };
    console.log(viewType);
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: "True-False",
      defaultValue: "True",
      onChange: onChangeTrueAndFalse,
    });
    const [choices, setChoicesList] = useState<String[]>([]);
    const [currentNewMCValue, setCurrentNewMCValue] = useState(""); //MC = multiple Choices
    const True = getRadioProps({ value: "true" });
    const False = getRadioProps({ value: "false" });

    useEffect(() => {
      setValues({ ...values, choices: choices });
    }, [choices]);
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
          <>
            <Box w="100%" maxW="700px" paddingBottom="40px">
              <FormLabel
                htmlFor={"multipleChoices"}
                fontSize="xl"
                fontWeight="normal"
                textTransform="capitalize"
                letterSpacing="wide"
              >
                Multiple Choices
              </FormLabel>
              <HStack
                border="white 1px solid"
                borderRadius={5}
                h="60px"
                w="full"
              >
                <Input
                  _focus={{
                    outline: "none",
                    borderSize: "0px",
                  }}
                  _selected={{
                    outline: "none",
                    borderSize: "0px",
                  }}
                  _active={{
                    outline: "none",
                    borderSize: "0px",
                  }}
                  id="multipleChoices"
                  borderColor="transparent"
                  onChange={({ target }) => setCurrentNewMCValue(target.value)}
                  value={currentNewMCValue}
                />
                <IconButton
                  onClick={async () => {
                    if (currentNewMCValue.length === 0) {
                      console.log("here");
                      /* set Error or shake input*/
                    } else {
                      console.log(currentNewMCValue);
                      setChoicesList(choices.concat(currentNewMCValue));
                      setCurrentNewMCValue("");
                    }
                  }}
                  icon={<PlusSquareIcon />}
                  aria-label="Add choice"
                  colorScheme="teal"
                  bgColor="transparent"
                />
              </HStack>

              <Wrap w="full" marginTop="24px" maxW="80vw">
                {choices.map((c, index) => {
                  return (
                    <Tag
                      key={index}
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
                          setValues({ ...values, choices: choices });
                        }}
                      />
                    </Tag>
                  );
                })}
              </Wrap>
            </Box>
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
          </>
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

export default SetFormQuestionTypeView;
