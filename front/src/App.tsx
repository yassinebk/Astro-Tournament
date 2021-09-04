/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import {  tokenState, userState } from './store';
import NoAuth from './components/Views/NoAuth';
import Admin from './components/Views/Admin';
import Player from './components/Views/Player';


function App() {
  
  const user = useReactiveVar(userState)

console.log("user",user)

  useEffect(() => {
    if (localStorage.getItem("AuthUser"))
      {
      const authInfo = JSON.parse(localStorage.getItem("AuthUser") as string);
      userState(authInfo.user);
      tokenState(authInfo.token);
      }} , [])

  if (!user) return ( <NoAuth/>)
 else if (user.role === "ADMIN") return (<Admin />)
 else return (<Player />)
  
}

export default App;
