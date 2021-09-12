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
  placeholder: string;
  label: string;
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
      w="90%"
      fontSize={["xl", "2xl", "3xl"]}
    >
      <FormLabel
        htmlFor={field.name}
        fontSize="xl"
        color="white"
        fontWeight="normal"
        textTransform="capitalize"
        letterSpacing="wide"
      >
        {props.label}
      </FormLabel>
      <InputOrTextArea
        bgColor="white"
        h={["45px", "50px", "55px"]}
        maxW="800px"
        {...field}
        id={field.name}
        placeholder={props.placeholder}
        type={props.type}
      />
      {error ? (
        <FormErrorMessage fontSize="md" fontWeight="italic">
          {error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
export default InputField;
