import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import { AiOutlineGoogle } from "@react-icons/all-files/ai/AiOutlineGoogle";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import * as Yup from "yup";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import { Container } from "../components/NoAuth/Container";
import { useRegisterMutation } from "../generated/graphql";
import withApollo from "../utils/createApolloClient";
import toErrorMap from "../utils/toErrorMap";

interface signupProps {}

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Full name is required")
    .min(1, "fullname should be valid"),
  username: Yup.string()
    .min(3, "Username too short")
    .max(35, "Username cannot be longer than 35 characts")
    .required("Username required"),
  password: Yup.string()
    .min(8, "password should be at least 8 characters long")
    .required("password required"),
  email: Yup.string().email("Invalid Email").required("Email required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Signup: React.FC<signupProps> = ({}) => {
  const [signup, { loading, error, data }] = useRegisterMutation({
    notifyOnNetworkStatusChange: true,
  });
  const router = useRouter();
  return (
    <Container>
      <Flex
        flexDir={["column", "column", "column", "row"]}
        marginTop={[8, 8, 12]}
        minW="340px"
        h="auto"
        bgColor="blackAlpha.900"
        borderRadius="24px"
        w="90%"
        maxH="1200px"
      >
        <Flex
          justifyContent="center"
          bg="rgb(37, 16, 13) url(https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1834&q=80)"
          color="white"
          bgPos="center center"
          w="full"
          bgClip="padding-box"
          bgRepeat="repeat"
          bgBlendMode="lighten"
          paddingY="10%"
          borderRadius="24px"
          marginBottom={["-6", "-6", "0"]}
        >
          <Heading
            fontSize={["xl"]}
            display={["inline-block", "inline-block", "inline-block", "none"]}
          >
            Register Your account
          </Heading>
        </Flex>
        <VStack
          paddingX={[3]}
          spacing={[2, 5, 9]}
          paddingTop={["40px", "55px"]}
          h="auto"
          paddingBottom="30px"
          w="100%"
        >
          <Button
            h="50px"
            maxW="580px"
            marginX="40px"
            w="full"
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
              fullname: "",
              username: "",
              confirmPassword: "",
              password: "",
              email: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await signup({
                variables: {
                  options: {
                    email: values.email,
                    username: values.username,
                    password: values.password,
                    fullname: values.fullname,
                  },
                },
              });
              console.log("here");
              if (response.data?.register.errors) {
                setErrors(toErrorMap(data.register.errors));
              }
              if (response.data?.register.user) {
                console.log("here2");
                router.push("/");
              }
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
                    labelColor="white"
                    color="black"
                    bgColor="white"
                    w="90%"
                    name="fullname"
                    placeholder="Full name"
                    label="Full name"
                    required
                  />
                  <InputField
                    name="username"
                    labelColor="white"
                    color="black"
                    bgColor="white"
                    w="90%"
                    placeholder="should be least 5 characters long"
                    label="Username"
                    required
                  />
                  <InputField
                    labelColor="white"
                    color="black"
                    name="email"
                    bgColor="white"
                    w="90%"
                    placeholder="user@provider.com"
                    required
                    label="Email"
                    type="email"
                  />
                  <InputField
                    name="password"
                    color="black"
                    labelColor="white"
                    bgColor="white"
                    w="90%"
                    required
                    placeholder="should be at least 8 characters long"
                    label="password"
                    type="password"
                  />
                  <InputField
                    labelColor="white"
                    color="black"
                    bgColor="white"
                    w="90%"
                    name="confirmPassword"
                    label="Confirm password"
                    placeholder="confirm your password"
                    type="password"
                    required
                  />
                </VStack>

                <VStack justifyContent="flex-start" paddingTop={12}>
                  <Button
                    marginX="auto"
                    type="submit"
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
                    Signup
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
                        <NextLink href="/signin">
                          <Link>Signin</Link>
                        </NextLink>
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

export default withApollo({ ssr: true })(Signup);
