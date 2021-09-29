import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { useToken } from "@chakra-ui/system";
import React from "react";
import { Level } from "../../generated/graphql";
import FullPageModal from "../FullPageModal";
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
    onOpen: onOpenDeletePopup,
    onClose: onCloseDeletePopup,
    isOpen: isOpenDeletePopup,
  } = useDisclosure();
  const {
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
    isOpen: isOpenEditModal,
  } = useDisclosure();
  return (
    <>
      <FullPageModal
        blurred={true}
        ownBackButton={true}
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
      >
        <LevelInfoView level={level} onClose={onCloseEditModal} />
      </FullPageModal>
      <ConfirmDialog
        onClose={onCloseDeletePopup}
        text={"Delete Level"}
        isOpen={isOpenDeletePopup}
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
      {/* <LevelInfoView level={level} /> */}
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
        <HStack justifyContent="space-evenly" w="40%" spacing={4}>
          <IconButton
            bgColor="#7FD8D8"
            aria-label="edit level"
            size="lg"
            icon={<EditIcon />}
            boxShadow=" 4px 4px 8px rgba(81, 78, 128, 0.67)"
            onClick={() => onOpenEditModal()}
            fontSize="25px"
          />
          <IconButton
            bgColor="transparent"
            aria-label="delete level"
            color="white"
            fontSize="20px"
            fontWeight="light"
            icon={<DeleteIcon color="#F07B7B" />}
            onClick={() => onOpenDeletePopup()}
            size="lg"
          />
        </HStack>
      </HStack>
    </>
  );
};
