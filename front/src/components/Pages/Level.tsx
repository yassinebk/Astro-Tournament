import { useReactiveVar, useQuery } from "@apollo/client";
import { VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { levelsState } from "../../store";
import { ALL_LEVELS } from "../../queries/Level";
import LevelsList from "./LevelLists";
import { Route, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import { QueryResult, OperationVariables } from "@apollo/client";
import LevelDisplay from "../Pages/LevelDisplay";
import LevelForm from "./LevelForm";

const Level = (): JSX.Element => {
  const levelsResult: QueryResult<any, OperationVariables> =
    useQuery(ALL_LEVELS);
  const levels = useReactiveVar(levelsState);
  console.log("levelResult", levelsResult);
  useEffect(() => {
    if (levelsResult.data) levelsState(levelsResult.data.allLevels);
  }, [levelsResult.data]);

  const { path } = useRouteMatch();

  return (
    <VStack spacing="52">
      <Header />
      <Route exact path={path}>
        <LevelsList levelQuery={levelsResult} levels={levels} />
      </Route>
      <Route path={`${path}/:id`}>
        <LevelDisplay />
      </Route>
      <Route path={`/LevelEditor/:id`}>
        One
        <LevelForm />
      </Route>
    </VStack>
  );
};

export default Level;
