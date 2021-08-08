import { Box } from "@chakra-ui/react";
import React from "react";
import Leaderboard from "../Pages/Leaderboard";
import { Switch, Route } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import AddAdmin from "../Pages/AddAdmin";
import Footer from "../Basic/Footer";
import Level from "../Pages/Level";
import Overview from "../Pages/Overview";
import LevelForm from "../Pages/LevelForm";

const Admin = () => {
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
        <Route path="/">
          <Overview />
        </Route>
      </Switch>
      <Footer />
    </Box>
  );
};

export default Admin;
