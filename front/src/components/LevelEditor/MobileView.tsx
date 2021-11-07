import { ChevronLeftIcon, AddIcon } from "@chakra-ui/icons";
import { Box, Flex, VStack } from "@chakra-ui/layout";
import { IconButton, Button, useDisclosure } from "@chakra-ui/react";
import router from "next/dist/client/router";
import React from "react";
import { NewLevelForm, LevelHorizontalCard } from ".";
import { RESPONSIVE_DISPLAY_MB } from "../../constant";
import { DeleteLevelMutationFn, Level } from "../../generated/graphql";

interface MobileViewProps {
  deleteLevel: DeleteLevelMutationFn;
}
const MobileView: React.FC<MobileViewProps> = ({ deleteLevel }) => {
  //TODO: ADD LEVELS AS A PROP , Maybe a context here
  const array = [1, 2, 3, 4, 5, 5, 7, 1, 1, 1, 1, 1, 1, 1];
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
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
          {array.map((l, index) => (
            <Box key={index}>
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
};
export default MobileView;
