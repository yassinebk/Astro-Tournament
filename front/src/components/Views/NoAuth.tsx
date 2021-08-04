import { Box } from "@chakra-ui/react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "../Basic/Footer";
import Navbar from "../Basic/Navbar";
import LoginForm from "../Pages/Login";
import Registration from "../Pages/Registration";
import Notification from "../Pages/Notification";
import Landing from "../Pages/Landing";
import LevelForm from "../Pages/LevelForm";

const NoAuth = () => {
  return (
    <Box>
      <Notification />
      <Navbar variant="NOAUTH" />
      <Switch>
        <Route path="/Register">
          <Registration />
        </Route>
        <Route path="/Login">
          <LoginForm />
        </Route>
        <Route path="/LevelForm">
          <LevelForm />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <Footer />
    </Box>
  );
};

export default NoAuth;
