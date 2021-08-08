import { useReactiveVar } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { levelsState, setNotification } from "../../store";
import { Level, idType } from "../../types";
import Questions from "./Questions";
import { Button, Box, Heading, Text } from "@chakra-ui/react";

interface PropTypes {
  level?: Level | null;
}

const LevelDisplay = (props: PropTypes) => {
  const [levelNumberField, setNumberFieldState] = useState(false);
  const history = useHistory();
  const levels = useReactiveVar(levelsState);
  const [level, setLevel] = useState<Level | null | undefined>(null);
  console.log("here", props.level);
  const { id }: idType = useParams();

  console.log("id", id);

  useEffect(() => {
    if (props.level) setLevel(level);
    else if (id) {
      console.log("levels", levels);

      setLevel(levels.find((l) => l.id === id));
      console.log("level", level);

      console.log(level);
    } else {
      if (!level) {
        history.push("/");
        setNotification("ERROR", "Error Occured redirected to home screen ");
      }
    }
  }, [levels]);

  const goToLevelEditor = () => {
    history.push(`/LevelEditor/${id}`);
  };

  const editLevelNumber = () => {};
  if (!level) {
    return (
      <div>
        level is not found might be deleted !
        <Link to="/" className="hover:underline hover:text-blue-300">
          go back !
        </Link>
      </div>
    );
  }

  return (
    <Box>
      <Box>
        <Heading>
          Level <span>Number {level.number}</span>
        </Heading>
        <Heading>
          ID :<span> {level.id}</span>
        </Heading>
        <Button
          as={Link}
          to={`/LevelEditor/${id}`}
          variant="solid"
          colorScheme="purple"
        >
          Edit Level
        </Button>
      </Box>
      <Box>
        <Text fontSize="5xl" colorScheme="blackAlpha">
          Questions of the level
        </Text>
        <Questions questions={level.questions} />
        <Button to="/questions/editor" variant="ghost" colorScheme="purple">
          Edit Questions
        </Button>
      </Box>
    </Box>
  );
};

export default LevelDisplay;
