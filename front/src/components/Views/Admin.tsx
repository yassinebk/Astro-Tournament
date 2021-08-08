import { Box } from "@chakra-ui/react";
import { useQuery, useReactiveVar } from "@apollo/client";
import React,{ useEffect } from "react";
import Leaderboard from "../Pages/Leaderboard";
import { Switch, Route } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import AddAdmin from "../Pages/AddAdmin";
import Footer from "../Basic/Footer";
import Level from "../Pages/Level";
import Overview from "../Pages/Overview";
import LevelForm from "../Pages/LevelForm";
import { ALL_QUESTIONS } from "../../queries/Questions";
import { questionsState } from "../../store";
import Questions from "../Pages/Questions";

const Admin = () => {
  const result = useQuery(ALL_QUESTIONS);
  useEffect(() => {
    if (result.data) {
      questionsState(result.data.allQuestions);
    }
  },[result.data])
  const questions= useReactiveVar(questionsState)
  return (
    <Box isFullWidth={true} className="h-screen flex flex-col justify-between">
      <Navbar variant="ADMIN" />
      <Switch>
        <Route path="/leaderboards">
          <Leaderboard />
        </Route>
        <Route path="/admin-add">
          <AddAdmin />
        </Route>
        <Route path="/level">
          <Level />
        </Route>
        <Route path={`/LevelEditor/:id`}>
          <LevelForm />
        </Route>
        <Route path="/Questions">
          <Questions questions={questions}/>
          </Route>
        <Route exact path="/">
          <Overview />
        </Route>
      </Switch>
      <Footer />
    </Box>
  );
};

export default Admin;
