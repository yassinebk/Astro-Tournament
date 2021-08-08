import React from "react";
import { Button, VStack, HStack, Box, Text } from "@chakra-ui/react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { OperationVariables, QueryResult } from "@apollo/client";
import { Level } from "../../types";
import Fetching from "../Basic/Fetching";

interface PropTypes {
  levelQuery: any;
  levels: Level[] | null;
}
const Levelslist = (props: PropTypes): JSX.Element | null => {
  if (props.levelQuery.loading) return <Fetching what="levels" />;

  if (!props.levels) return null;
  if (props.levels?.length === 0)
    return (
      <Box as="div">
        <Text as="h1" size="4xl">
          currently there are no levels to display
        </Text>
      </Box>
    );

  // level view cards  horizontal maybe tables//
  return (
    <VStack as="div">
      {props.levels.map((l) => (
        <LevelHorizontalCards level={l} />
      ))}
    </VStack>
  );
};

interface SubElemetnPropTypes {
  level: Level;
}

const LevelHorizontalCards = ({ level }: SubElemetnPropTypes) => {
  return (
    <Box
      maxw="lg"
      borderwidth="3px"
      borderendradius="lg"
      bordercolor="magenta"
      d="flex"
      flexdirection="column"
      bgcolor="purple.900"
    >
      <Box textcolor="white" bgcolor="purple.600">
        <p>
          {level.id} : <span color="purple">{level.number}*</span>
        </p>
      </Box>
      <HStack spacing={8}>
        <Link to={`/level/${level.id}`}>
          <Button size="md" height="48px" border="2px" borderColor="purple.300">
            Edit
          </Button>
        </Link>
      </HStack>
    </Box>
  );
};

export default Levelslist;
