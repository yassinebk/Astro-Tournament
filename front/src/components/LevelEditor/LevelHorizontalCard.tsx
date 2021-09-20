import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { useToken } from "@chakra-ui/system";
import React from "react";
import { Level } from "../../generated/graphql";
import ConfirmDialog from "./ConfirmDialog";
import LevelInfoView from "./LevelInfoView";

interface LevelHorizontalCardProps {
  level: Level;
  deleteLevel;
}

export const LevelHorizontalCard: React.FC<LevelHorizontalCardProps> = ({
  level,
  deleteLevel,
}) => {
  const {
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
    isOpen: isOpenDeleteModal,
  } = useDisclosure();
  const {
    onOpen: onOpenEditModal,
    onClose: onCloseModal,
    isOpen: isOpenModal,
  } = useDisclosure();
  return (
    <>
      <ConfirmDialog
        onClose={onCloseDeleteModal}
        text={"Delete Level"}
        isOpen={isOpenDeleteModal}
        callback={async () => {
          try {
            await deleteLevel({
              variables: {
                levelId: level._id,
              },
            });
          } catch (error) {
            /*Show Error popup*/
          }
        }}
      />
      <LevelInfoView level={level} />
      <HStack
        justifyContent={["space-evenly", "space-evenly", "stretch"]}
        alignItems="center"
        bgColor="transparent"
        border="1px solid #6D7E80"
        alignSelf="stretch"
        borderRadius="8px"
        padding="20px"
        minW="330px"
        minH="71px"
      >
        <VStack w="100%">
          <Heading color="white" fontSize="xl">
            {level.name}
          </Heading>
          <Text fontSize="11px" color="whiteAlpha.900">
            {level._id}
          </Text>
          <span
            style={{
              fontSize: "24px",
              color: useToken("colors", "cyan.800"),
            }}
          >
            {level.number + "  "}
          </span>
        </VStack>
        <HStack justifyContent="space-evenly" w="40%">
          <IconButton
            bgColor="#7FD8D8"
            aria-label="edit level"
            size="lg"
            icon={<EditIcon />}
            boxShadow=" 4px 4px 8px rgba(81, 78, 128, 0.67)"
            onClick={onOpenEditModal}
            fontSize="25px"
          />
          <IconButton
            boxShadow=" 4px 4px 8px rgba(81, 78, 128, 0.67)"
            bgColor="#F07B7B"
            aria-label="delete level"
            color="white"
            fontSize="20px"
            fontWeight="light"
            icon={<DeleteIcon />}
            onClick={onOpenDeleteModal}
            size="lg"
          />
        </HStack>
      </HStack>
    </>
  );
};
