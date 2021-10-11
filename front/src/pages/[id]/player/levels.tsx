import { Flex, Heading, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { useEffect } from "react";
import { AuthLoadingScreen } from "../../../components/Auth";
import AuthLayout from "../../../components/Auth/AuthLayout";
import { LevelsDisplay } from "../../../components/LevelsView";
import ScrollToTopBtn from "../../../components/ScrollToTopBtn";
import { Level, useAllLevelQuery } from "../../../generated/graphql";
import withApollo from "../../../utils/createApolloClient";

interface levelsProps {}

export const Levels: React.FC<levelsProps> = ({}) => {
  const { data, loading } = useAllLevelQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (!data) {
    return <AuthLoadingScreen />;
  }
  return (
    <AuthLayout>
      <VStack marginTop="30px" spacing={8} paddingY={16} position="relative">
        <Heading color="white">
          Current Points{" "}
          <span style={{ color: "#0BD3FF" }}>{50000 /*playerpoints*/}</span>
        </Heading>
        <LevelsDisplay levels={data.allLevels} />
      </VStack>
    </AuthLayout>
  );
};

export default withApollo({ ssr: false })(Levels);
