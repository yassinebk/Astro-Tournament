import { GridItem, Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { LevelHorizontalCard } from ".";
import { RESPONSIVE_DISPLAY_PC } from "../../constant";
import { DeleteLevelMutationFn } from "../../generated/graphql";
import { textStyling } from "../../theme";

interface WebViewProps {
  deleteLevel: DeleteLevelMutationFn;
}
const WebView: React.FC<WebViewProps> = ({ deleteLevel }) => {
  const array = [1, 2, 3, 4, 5, 5, 7, 1, 1, 1, 1, 1, 1, 1];

  const [selectedLevel, selectLevel] = useState(null);
  return (
    <>
      <GridItem
        colStart={2}
        colEnd={7}
        display={RESPONSIVE_DISPLAY_PC}
        // marginY="29px"
        alignSelf="center"
        justifySelf="center"
        h="94%"
        maxW="450px"
        maxH="100vh"
        background=" linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 0.0646875) 97.4%, rgba(245, 245, 245, 0.06) 100%)"
        w="full"
      >
        <Heading
          {...textStyling.h2}
          color="white"
          textAlign="center"
          w="full"
          padding="30px"
          marginBottom="10px"
        >
          Levels List
        </Heading>
        <VStack
          alignItems="center"
          paddingX="12px"
          spacing={4}
          overflow="scroll"
          h="82%"
        >
          {array.map((a, index) => (
            <LevelHorizontalCard
              /* TODO : remove the as  */
              onClick={() => selectLevel(index)}
              key={index}
              level={
                {
                  id: "13313",
                  levelPictureUrl: "adas",
                  name: "HELLO",
                } as LevelInfo
              }
              deleteLevel={deleteLevel}
              // editLevel={editLevel}
            />
          ))}
        </VStack>
      </GridItem>

      <GridItem colStart={8} colEnd={12}>
        <Heading as="h1" size="xl">
          Level {selectedLevel.number}
        </Heading>
        <Heading size="md">Level {selectedLevel.id}</Heading>
      </GridItem>
    </>
  );
};

export default WebView;
