import {
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAddLevelMutation } from "../../generated/graphql";
import FullPageModal from "../FullPageModal";
import InputField from "../InputField";

interface NewLevelFormProps {
  onClose: () => void;
  isOpen: boolean;
}
const validationSchema = Yup.object().shape({
  levelNumber: Yup.number().max(100, "max Level is 100"),
  levelPictureUrl: Yup.string().min(3, "Url should be valid"),
  name: Yup.string().min(1, "Name should be at least 1 character long"),
});

const NewLevelForm: React.FC<NewLevelFormProps> = ({ isOpen, onClose }) => {
  const [addLevel, { data, loading, error }] = useAddLevelMutation({
    notifyOnNetworkStatusChange: true,
  });
  return (
    <FullPageModal
      onClose={onClose}
      isOpen={isOpen}
      modalTitle={"Create new Level"}
    >
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          levelNumber: 0,
          levelPictureUrl: "",
          name: "",
        }}
        validate={(values) => console.log(values.levelNumber)}
        validateOnChange={true}
        onSubmit={async (values, { setErrors }) => {
          console.log("values", values);
          addLevel({
            name: values.name,
            number: values.levelNumber,
            levelPictureUrl: values.levelPictureUrl,
          });
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
                alignContent: "center",
                height: "auto",
              }}
            >
              <VStack
                justifyContent="space-between"
                paddingY="32px"
                w="100%"
                minH="500px"
              >
                <VStack spacing={4} h="auto">
                  <InputField
                    marginTop="40px"
                    name="name"
                    placeholder="Name"
                    label="Level's name"
                    type="text"
                    color="white"
                    w="100%"
                    bgColor="transparent"
                  />

                  <FormControl>
                    <FormLabel
                      htmlFor="levelNumber"
                      fontSize="xl"
                      fontWeight="normal"
                      textTransform="capitalize"
                      letterSpacing="wide"
                    >
                      Level Number
                    </FormLabel>

                    <NumberInput
                      onChange={(value) =>
                        setValues({ ...values, levelNumber: parseInt(value) })
                      }
                      value={values.levelNumber}
                      defaultValue={values.levelNumber}
                      id="levelNumber"
                      aria-label="level number"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <InputField
                    marginTop="40px"
                    name="levelPictureUrl"
                    placeholder="insert a picture link for the level"
                    label="Level Picture URL"
                    type="text"
                    color="white"
                    w="100%"
                    bgColor="transparent"
                  />
                </VStack>
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="teal"
                  variant="outline"
                  bgColor="#7FD8D8"
                  marginTop="80px"
                  minH="50px"
                  fontSize="2xl"
                  w={["full"]}
                  h="60px"
                >
                  Add level
                </Button>
              </VStack>
            </Form>
          );
        }}
      </Formik>
    </FullPageModal>
  );
};

export default NewLevelForm;
