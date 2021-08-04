import { useReactiveVar, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/layout";
import { HStack, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { levelsState } from "../../store";
import Fetching from "../Basic/Fetching";
import { ALL_LEVELS } from "../../queries/Level";
import { Link, useHistory } from "react-router-dom";

const Level = (): JSX.Element => {
  const history = useHistory();
  const levels = useReactiveVar(levelsState);
  const levelsResult = useQuery(ALL_LEVELS);

  console.log("levelResult", levelsResult);
  useEffect(() => {
    if (levelsResult.data) levelsState(levelsResult.data.allLevels);
  }, [levelsResult.data]);

  const LevelsList = (): JSX.Element | null => {
    if (levelsResult.loading) return <Fetching what="Levels" />;

    if (levels.length === 0)
      return (
        <Box as="div">
          <Heading as="h1" size="4xl">
            Currently there are no Levels to display
          </Heading>
        </Box>
      );

    // Level View Cards  Horizontal maybe tables//
    return (
      <HStack as="div">
        {levels.map((l) => (
          <Box
            maxW="lg"
            borderWidth="3px"
            borderEndRadius="lg"
            borderColor="magenta"
            d="flex"
            flexDirection="column"
            bgColor="purple.900"
          >
            <Box textColor="white" bgColor="purple.600">
              <p>
                {l.id} : <span color="purple">{l.number}*</span>
              </p>
            </Box>
            <HStack spacing={8}>
              <Link to={`/Level/${l.id}`}>
                <Button
                  size="md"
                  height="48px"
                  width="200px"
                  border="2px"
                  borderColor="purple.300"
                >
                  Edit
                </Button>
              </Link>
            </HStack>
          </Box>
        ))}
      </HStack>
    );
  };
  return (
    <div>
      <LevelsList />
    </div>
  );
};

export default Level;
