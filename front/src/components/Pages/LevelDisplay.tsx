import { useReactiveVar } from "@apollo/client";
import React from "react";
import { useParams, useHistory } from "react-router";
import { levelsState } from "../../store";
import { Level, idType } from "../../types";
import Questions from "./Questions";
import { Button, Box, Heading } from "@chakra-ui/react";

interface PropTypes {
  level?: Level | null;
}

const LevelDisplay = (props: PropTypes) => {
  const history = useHistory();
  const levels = useReactiveVar(levelsState);
  let level: Level | undefined;
  console.log("here", props.level);
  const { id }: idType = useParams();
  console.log("id", id);
  if (!props.level && !id) {
    return (
      <div>
        <h1> Error Go back to Home</h1>
      </div>
    );
  } else if (id) {
    console.log(levels);
    level = levels.find((l) => l.id === id);
    console.log(level);
  }
  const goToLevelEditor = () => {
    history.push(`/LevelEditor/${id}`);
  };
  if (!level) {
    history.push("/");
    return null;
  }

  return (
    <Box>
      <Box>
        <Heading>
          Level Number <span>Number {level.number}</span>
        </Heading>
        <Heading>
          ID <span>{level.id}</span>
        </Heading>
        <Button onClick={goToLevelEditor} variant="solid" colorscheme="purple">
          Edit Level
        </Button>
      </Box>
      <Box>
        <Questions questions={level.questions} />
      </Box>
    </Box>
  );
};

export default LevelDisplay;
