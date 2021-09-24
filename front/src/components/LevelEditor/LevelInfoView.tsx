import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { Level } from "../../generated/graphql";
import FullPageModal from "../FullPageModal";
import QuestionHorizCard from "./QuestionHorizCard";

interface LevelInfoViewProps {
  level: Level;
  onClose: () => void;
}

export const LevelInfoView: React.FC<LevelInfoViewProps> = ({
  level,
  onClose,
}) => {
  const {
    onOpen: onOpenDeletePopup,
    onClose: onCloseDeletePopup,
    isOpen: isOpenDeletePopup,
  } = useDisclosure();
  return (
    <VStack
      spacing={4}
      minH="500px"
      border="1px solid #9F9696"
      alignItems="center"
      backdropFilter="blur(18px)"
      justifyContent="flex-start"
      paddingBottom="50px"
      borderRadius="15px"
    >
      <IconButton
        bgColor="transparent"
        marginRight="auto"
        icon={<ChevronLeftIcon />}
        aria-label="go back"
        onClick={onClose}
        color="white"
        size="lg"
        fontSize="45px"
      />

      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="full"
        paddingX={4}
      >
        <VStack textAlign="left">
          <Heading w="full" color="#FEF1F1" fontSize="xl" fontWeight="bold">
            Level {level.number}
          </Heading>
          <Text w="full" fontSize="sm" fontWeight="light" color="#65D2D5">
            {level._id}
          </Text>
        </VStack>
        <IconButton
          boxShadow=" 4px 4px 8px rgba(81, 78, 128, 0.67)"
          bgColor="#F07B7B"
          aria-label="delete level"
          color="white"
          fontSize="20px"
          fontWeight="light"
          icon={<DeleteIcon />}
          onClick={onOpenDeletePopup}
          size="lg"
        />
      </HStack>
      <VStack>
        <Heading fontSize="xs" fontWeight="hairline" color="white">
          Level Questions
        </Heading>
        {level.Questions.map((q) => (
          <QuestionHorizCard question={q} />
        ))}
      </VStack>
    </VStack>
  );
};

export default LevelInfoView;
