import { Box, Flex, Heading, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { useEffect } from "react";
import AuthLayout from "../../../components/Auth/AuthLayout";
import { LevelsDisplay } from "../../../components/LevelsView";
import { useAllLevelQuery } from "../../../generated/graphql";
import withApollo from "../../../utils/createApolloClient";

interface levelsProps {}

export const Levels: React.FC<levelsProps> = ({}) => {
  const { data, loading } = useAllLevelQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (!data) {
    return (
      <AuthLayout>
        <Flex
          justifyContent="center"
          alignItems="center"
          w="100%"
          minH="500px"
          h="100%"
          marginTop="20px"
        >
          {" "}
          <Spinner margin="auto" color="white" size="xl" />
        </Flex>
      </AuthLayout>
    );
  }
  return (
    <AuthLayout>
      <VStack marginTop="30px">
        <Heading color="white">
          Current Points{" "}
          <span style={{ color: "#0BD3FF" }}>{50000 /*playerpoints*/}</span>
        </Heading>
        <LevelsDisplay levels={data.allLevels} />
      </VStack>
    </AuthLayout>
  );
};

export default withApollo({ ssr: true })(Levels);
