import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Flex, VStack } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React from "react";
import AuthLayout from "../../../components/Auth/AuthLayout";
import AuthLoadingScreen from "../../../components/AuthLoadingScreen";
import { LevelHorizontalCard } from "../../../components/LevelEditor/LevelHorizontalCard";
import NewLevelForm from "../../../components/LevelEditor/NewLevelForm";
import {
  useAllLevelQuery,
  useDeleteLevelMutation,
} from "../../../generated/graphql";
// import NewLevelForm from "../../../components/LevelEditor/NewLevelForm";

interface levelEditorProps {}

export const levelEditor: React.FC<levelEditorProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useAllLevelQuery();
  const [deleteLevel, { data: deleteLevelData, loading: deleteLevelLoading }] =
    useDeleteLevelMutation();
  const { onOpen, onClose, isOpen } = useDisclosure();

  if (!data) {
    return <AuthLoadingScreen />;
  }

  return (
    <AuthLayout>
      <NewLevelForm onClose={onClose} isOpen={isOpen}/>
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
          {data.allLevels.map((l) => (
            <Box>
              <LevelHorizontalCard
                level={l}
                deleteLevel={deleteLevel}
                // editLevel={editLevel}
              />
            </Box>
          ))}
        </VStack>
      </Flex>
    </AuthLayout>
  );
};

export default levelEditor;
