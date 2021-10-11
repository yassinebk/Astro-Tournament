import { Button } from "@chakra-ui/button";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { AiOutlineGoogle } from "@react-icons/all-files/ai/AiOutlineGoogle";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import * as Yup from "yup";
import { AuthProvider } from "../components/AuthProvider";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import { Container } from "../components/NoAuth/Container";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import withApollo from "../utils/createApolloClient";
import toErrorMap from "../utils/toErrorMap";

interface signupProps {}

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username required"),
  password: Yup.string(),
});

const Signin: React.FC<signupProps> = ({}) => {
  const [signin, { data, loading, error }] = useLoginMutation({
    notifyOnNetworkStatusChange: true,
    update: (cache, { data }) => {
      const { token, user } = data.login;
      const authUser = { token, user };
      console.log("here444");
      localStorage.setItem("authUser", JSON.stringify(authUser));
      console.log(localStorage.getItem("authUser"));
      cache.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",

          me: {
            user: data.login?.user,
          },
        },
      });
    },
  });

  const router = useRouter();
  return (
    <Container>
      <Flex
        flexDir={["column", "column", "column", "row"]}
        marginTop={[8, 8, 12]}
        marginBottom={[16, 22, 32]}
        minW="340px"
        h="auto"
        bgColor="blackAlpha.900"
        borderRadius="24px"
        w="100%"
        maxH="1000px"
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
              usernameOrEmail: "",
              password: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              await signin({
                variables: {
                  option: {
                    usernameOrEmail: values.usernameOrEmail,
                    password: values.password,
                  },
                },
              });
              if (data?.login.errors) {
                setErrors(toErrorMap(data.login.errors));
              }
            }}
          >
            {({ isSubmitting }) => (
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
                    color="black"
                    labelColor="white"
                    bgColor="white"
                    w="90%"
                  />

                  <InputField
                    w="90%"
                    name="password"
                    required
                    placeholder="should be at least 8 characters long"
                    label="password"
                    type="password"
                    color="black"
                    labelColor="white"
                    bgColor="white"
                  />
                </VStack>
                <VStack justifyContent="flex-start" paddingTop={12}>
                  <Button
                    type="submit"
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
                      Doesn't have an Account ?{"   "}
                      <span
                        style={{
                          justifySelf: "center",
                          textAlign: "center",
                          textDecoration: "underline",
                          color: "#097680",
                          fontSize: 22,
                        }}
                      >
                        <NextLink href="/signup">
                          <Link>Sign up</Link>
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

export default withApollo({ ssr: true })(Signin);
