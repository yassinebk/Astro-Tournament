import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, VStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { AuthLayout, AuthLoadingScreen } from "../../../components/Auth";
import {
  LevelHorizontalCard,
  NewLevelForm
} from "../../../components/LevelEditor";
import {
  Level,
  useAllLevelQuery,
  useDeleteLevelMutation
} from "../../../generated/graphql";

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
          {data.allLevels.map((l) => (
            <Box key={l._id}>
              <LevelHorizontalCard
                /* TODO : remove the as  */
                level={l as Level}
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
