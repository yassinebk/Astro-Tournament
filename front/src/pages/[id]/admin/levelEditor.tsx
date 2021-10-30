import {
  GridItem,
  Button,
  IconButton,
  Box,
  Flex,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AuthLayout, AuthLoadingScreen } from "../../../components/Auth";
import {
  LevelHorizontalCard,
  NewLevelForm,
} from "../../../components/LevelEditor";
import {
  RESPONSIVE_DISPLAY_MB,
  RESPONSIVE_DISPLAY_PC,
} from "../../../constant";
import {
  Level,
  useAllLevelQuery,
  useDeleteLevelMutation,
  useMeQuery,
} from "../../../generated/graphql";
import withApollo, { apolloClient } from "../../../utils/createApolloClient";
import { gql, useApolloClient, useQuery } from "@apollo/client";

interface levelEditorProps {
  dataProps: any;
}

export const levelEditor: React.FC<levelEditorProps> = ({ dataProps }) => {
  console.log("data Props", dataProps);
  const router = useRouter();
  const { data, loading } = useAllLevelQuery();
  const [deleteLevel, { data: deleteLevelData, loading: deleteLevelLoading }] =
    useDeleteLevelMutation();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const array = [1, 2, 3, 4, 5, 5, 7, 1, 1, 1, 1, 1, 1, 1];

  if (!data) {
    return <AuthLoadingScreen />;
  }
  const MobileView = () => (
    <Box display={RESPONSIVE_DISPLAY_MB}>
      <NewLevelForm onClose={onClose} isOpen={isOpen} />
      <Flex
        flexDir="column"
        justifyContent={["flex-start"]}
        alignContent="stretch"
        w={["auto", "auto", "100vw"]}
        marginTop="30px"
        minW="375px"
        fontSize="30px"
      >
        <IconButton
          bgColor="transparent"
          w="40px"
          h="40px"
          icon={<ChevronLeftIcon />}
          aria-label="return"
          onClick={() => router.back()}
          marginBottom="20px"
          _focus={{ bgColor: "#7FD8D8" }}
          _hover={{ bgColor: "#7FD8D8" }}
          _active={{ bgColor: "#7FD8D8" }}
          size="xl"
          color="white"
        />
        <VStack spacing={4}>
          <Button
            onClick={onOpen}
            leftIcon={<AddIcon />}
            minW="330px"
            minH="70px"
            bgColor="#7FD8D8"
            border=" 1.08698px solid #7FD8D8"
            boxShadow="4.34793px 4.34793px 8.69585px rgba(81, 78, 128, 0.67)"
            backdropFilter="blur(22px)"
            borderRadius="8px"
            fontWeight="400"
            color="#405555"
            justifyContent="space-around"
            fontSize="26px"
          >
            Add a level
          </Button>
          {array.map((l) => (
            <Box key={l._id}>
              <LevelHorizontalCard
                /* TODO : remove the as  */
                level={{ name: "here", _id: "afdasfasdf" } as Level}
                deleteLevel={deleteLevel}
                // editLevel={editLevel}
              />
            </Box>
          ))}
        </VStack>
      </Flex>
    </Box>
  );

  const WebView = () => (
    <>
      <GridItem
        colStart={2}
        colEnd={7}
        display={RESPONSIVE_DISPLAY_PC}
        marginY="29px"
        marginX="30px"
        maxW="450px"
        maxH="829px"
        background=" linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 0.0646875) 97.4%, rgba(245, 245, 245, 0.06) 100%)"
        w="full"
        h="full"
      >
        <Heading
          color="white"
          textAlign="center"
          w="full"
          padding="30px"
          marginBottom="16px"
        >
          Levels List
        </Heading>
        <VStack
          alignItems="center"
          paddingX="12px"
          spacing={4}
          maxH="full"
          overflow="scroll"
        >
          {array.map((a) => (
            <LevelHorizontalCard
              /* TODO : remove the as  */
              level={
                { id: "13313", levelPictureUrl: "adas", name: "HELLO" } as Level
              }
              deleteLevel={deleteLevel}
              // editLevel={editLevel}
            />
          ))}
        </VStack>
      </GridItem>
    </>
  );
  return (
    <AuthLayout>
      <MobileView />
      <WebView />
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
