import { Container } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { SetNotification, SetTokenType, SetUserType } from '../../types'
import Footer from "../Basic/Footer"
import Navbar from '../Basic/Navbar'
import LoginForm from '../Pages/Login'
import Registration from '../Pages/Registration'

interface PropTypes {
    setNotif: SetNotification,
    setToken: SetTokenType,
    setUser:SetUserType
}

const NoAuth= ({setNotif,setToken,setUser}:PropTypes) => {
   return (
      <Container>
      <Navbar variant="NOAUTH" />
     <Route path="/Register">
              <Registration setNotification={setNotif} setToken={setToken} setUser={setUser} />

          </Route>
          <Route path="/Login">
        <LoginForm setNotification={setNotif} setToken={setToken} setUser={setUser}/>
          </Route>
      <Footer/>
</Container>
  ) 
}

export default NoAuth
