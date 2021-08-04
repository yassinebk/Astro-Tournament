/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Basic/Navbar';
import LoginForm from './components/Login';
import Notification from "./components/Notification";
import Registration from './components/Registration';
import LevelForm from"./components/LevelForm"
import { NotifType, SetNotification, SetTokenType, SetUserType } from './types';
import {ChakraProvider, Container} from "@chakra-ui/react";
import Footer from "./components/Footer"

function App() {
  const [token, setToken] = useState<SetTokenType>(null);
  const [notification, setNotification] = useState<SetNotification>(null);
  const [user, setUser] = useState<SetUserType>(null);
  const [questions, setQuestions] = useState([])
  const [levels, setLevels] = useState([]);



  useEffect(() => {
    if (localStorage.getItem("AuthUser"))
      {
        const user = JSON.parse(localStorage.getItem("AuthUser") as string);
      setToken(user.token);
      setUser(user);
      }} , [])

  const setNotif:SetNotification = (type:NotifType,message:string) => {
    console.log(message)
    console.log()
    const notification = {
      type,
      message
    }
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    },4000)
  }
  if (!user) {
    return (
      <Container>
      <Navbar variant="NOAUTH" />
    <Router>
     <Route path="/Register">
              <Registration setNotification={setNotif} setToken={setToken} setUser={setUser} />

          </Route>
          <Route path="/Login">
            <LoginForm setNotification={setNotif} setToken={setToken} setUser={setUser}/>
          </Route>
    </Router>
      <Footer/>
</Container>
  )
}
else if(user.role==="ADMIN")
return (
    <ChakraProvider>
    <Navbar variant="admin"/>
    <Router>
    <div className="App">
        <Navbar variant={token?"LoggedIn":""} />
        <Notification  notification={notification}/>
        <Switch>
     
          <Route path="/level">
                <LevelForm setNotification={setNotif}/>
          </Route>
    </Switch> </div> </Router> </ChakraProvider>
  );

  else {
    return (
      
    )
  }
}

export default App;
