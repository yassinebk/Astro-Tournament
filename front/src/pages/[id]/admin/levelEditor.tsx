import { gql } from "@apollo/client";
import React from "react";
import { AuthLayout, AuthLoadingScreen } from "../../../components/Auth";
import { MobileView, WebView } from "../../../components/LevelEditor";
import {
  useAllLevelQuery,
  useDeleteLevelMutation
} from "../../../generated/graphql";
import { apolloClient } from "../../../utils/createApolloClient";

interface levelEditorProps {
  dataProps: any;
}

export const levelEditor: React.FC<levelEditorProps> = ({ dataProps }) => {
  const { data, loading } = useAllLevelQuery();
  const [deleteLevel, { data: deleteLevelData, loading: deleteLevelLoading }] =
    useDeleteLevelMutation();


  if (!data) {
    return <AuthLoadingScreen />;
  }

  return (
    <AuthLayout>
      <MobileView deleteLevel={deleteLevel} />
      <WebView deleteLevel={deleteLevel} />
    </AuthLayout>
  );
};

export const getServerSideProps = async () => {
  const props: any = {};
  try {
    const { data } = await apolloClient.query({
      query: gql`
        query allLevel {
          allLevels {
            ...LevelInfo
          }
        }
      `,
    });

    props.dataProps = data;
    console.log("data?", data);
  } catch (e) {
    console.log(e);
  }

  return {
    props,
  };
};

export default levelEditor;
