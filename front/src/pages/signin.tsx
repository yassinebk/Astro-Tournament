import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { AiOutlineGoogle } from "@react-icons/all-files/ai/AiOutlineGoogle";
import { Form, Formik } from "formik";
import React from "react";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import InputField from "../components/InputField";
import { Navbar } from "../components/Navbar";
import * as Yup from "yup";

interface signupProps {}

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username required"),
  password: Yup.string(),
});

const Signup: React.FC<signupProps> = ({}) => {
  return (
    <Container>
      <Navbar />
      <Flex
        flexDir={["column", "column", "column", "row"]}
        marginTop={[8, 8, 12]}
        marginBottom={[16, 22, 32]}
        minW="340px"
        h="auto"
        bgColor="blackAlpha.900"
        borderRadius="24px"
        w="90vw"
        maxH="1000px"
      >
        <Flex
          justifyContent="center"
          bg="rgb(37, 16, 13) url(https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1834&q=80)"
          color="white"
          bgPos="center center"
          w="full"
          bgClip="padding-box"
          //h={["auto", "auto", "100%"]}
          bgRepeat="repeat"
          bgBlendMode="lighten"
          paddingY="10%"
          borderRadius="24px"
          marginBottom={["-6", "-6", "0"]}

          //background="linear-gradient(0deg, rgba(46, 25, 69, 0.32), rgba(46, 25, 69, 0.32)), url(.jpg)"
        >
          <Heading
            fontSize={["xl"]}
            display={["inline-block", "inline-block", "inline-block", "none"]}
          >
            Sign in to your account
          </Heading>
        </Flex>
        <VStack
          paddingX={[3]}
          spacing={[8, 5, 9]}
          paddingTop={["50px", "55px"]}
          h="auto"
          paddingBottom="30px"
          w="100%"
        >
          <Button
            h={14}
            maxW="600px"
            //h={[]}
            w="100%"
            colorScheme="red"
            color="#071173"
            leftIcon={<AiOutlineGoogle />}
          >
            With Google Account
          </Button>
          <Divider color="white" />
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              username: "",
              confirmPassword: "",
              password: "",
              email: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form
                color="white"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  height: "auto",
                }}
              >
                <VStack spacing={4}>
                  <InputField
                    name="usernameOrEmail"
                    placeholder="should be least 5 characters long"
                    label="Username or Email"
                    required
                  />

                  <InputField
                    name="password"
                    required
                    placeholder="should be at least 8 characters long"
                    label="password"
                    type="password"
                  />
                </VStack>
                <VStack justifyContent="flex-start" paddingTop={12}>
                  <Button
                    marginX="auto"
                    justifySelf="center"
                    minW="115px"
                    minH="50px"
                    fontSize={["16px"]}
                    padding="8px 13px"
                    borderRadius="5px"
                    isLoading={isSubmitting}
                    width={[50, 65, 80]}
                    color="white"
                    bg=" linear-gradient(94.71deg, rgba(52, 15, 64, 0.72) 0%, #0C818F 100%)"
                  >
                    Signin
                  </Button>
                  <Box
                    //paddingTop={["8px", "22px"]}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <Text color="white" fontSize={["sm", "xl"]}>
                      Already Have an Account ?{"   "}
                      <span
                        style={{
                          justifySelf: "center",
                          textAlign: "center",
                          textDecoration: "underline",
                          color: "#097680",
                          fontSize: 22,
                        }}
                      >
                        Signin
                      </span>
                    </Text>
                  </Box>
                </VStack>
              </Form>
            )}
          </Formik>
        </VStack>
      </Flex>
      <Footer />
    </Container>
  );
};

export default Signup;