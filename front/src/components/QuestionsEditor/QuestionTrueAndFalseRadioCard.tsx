import { useRadio, Box, Checkbox } from "@chakra-ui/react";
import React from "react";

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
        backgroundColor={
          props.checked ? (props.true ? "green.600" : "red.600") : "transparent"
        }
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

export default RadioCard;
