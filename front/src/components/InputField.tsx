import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { ComponentWithAs, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  marginTop?: string;
  placeholder: string;
  w?: string;
  h?: string | string[];
  label: string;
  bgColor?: string;
  color?: string;
  labelColor?: string;
  textArea?: boolean;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  let InputOrTextArea: ComponentWithAs<any, any> = Input;
  if (props.textArea) InputOrTextArea = Textarea;
  return (
    <FormControl
      display="flex"
      maxW="700px"
      flexDir="column"
      justifyContent="center"
      alignItems="flexStart"
      padding="auto"
      margin="auto"
      isInvalid={!!error}
      minW="288px"
      minH="45px"
      w={props.w ? props.w : ""}
      fontSize={["xl", "2xl", "3xl"]}
    >
      <FormLabel
        color={props.labelColor}
        htmlFor={field.name}
        fontSize="xl"
        fontWeight="normal"
        textTransform="capitalize"
        letterSpacing="wide"
      >
        {props.label}
      </FormLabel>
      <InputOrTextArea
        color={props.color}
        bgColor={props.bgColor}
        h={props.h ? props.h : ["45px", "50px", "55px"]}
        maxW="800px"
        {...field}
        id={field.name}
        placeholder={props.placeholder}
        type={props.type}
      />{" "}
      {error ? (
        <FormErrorMessage
          color="red.200"
          h="30px"
          fontSize="md"
          w={props.w}
          fontWeight="italic"
        >
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default InputField;
