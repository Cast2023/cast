import { Container, Toolbar, AppBar, IconButton, Button } from "@mui/material"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import ConsultService from "./Services/ConsultService"
import Home from "./Components/Home"
import Profile from "./Components/Profile"
import Search from "./Components/Search"
import axios from "axios"

import { GoogleLogin } from "@react-oauth/google"
// import successCallback from "./Goauth"

const successCallback = ({ credentialResponse, setSessionState }) => {
  console.log(credentialResponse.credential)

  const result = axios.get(process.env.REACT_APP_BACKEND_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.stringify(credentialResponse.credential),
    },
  })
  const verify = result.then((promiseresponse) => {
    console.log(promiseresponse.data)
    if (promiseresponse.data === "Just keep swimming.") {
      console.log("Token matches")
      setSessionState(true)
    }
  })
  console.log("Response", result)

  return result
}

const App = () => {
  const [consult, setConsult] = useState([])
  const [sessionState, setSessionState] = useState(false)

  const padding = {
    padding: 5,
  }

  useEffect(() => {
    ConsultService.getAllConsults().then((consults) => {
      setConsult(consults)
    })
  }, [])

  const handleLogIn = (event) => {
    event.preventDefault()
    setSessionState(true)
  }
  // console.log(sessionState)

  return (
    <Container>
      <Router>
        <div>
          <h1>Competency, Allocation and Skill tracker</h1>
        </div>

        {sessionState ? (
          <div>
            <AppBar>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                ></IconButton>
                <Button color="inherit" component={Link} to="/" id="home">
                  home
                </Button>
                <Button color="inherit" component={Link} to="/search">
                  search
                </Button>
                <Button color="inherit" component={Link} to="/profile">
                  profile
                </Button>
                <Button color="inherit" component={Link} to="/notes">
                  api
                </Button>
              </Toolbar>
            </AppBar>
            <Routes>
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile consult={consult} />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        ) : (
          <div>
            <div>Start by logging in: </div>
            <br />
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                successCallback({credentialResponse, setSessionState })

              }}
              onError={() => {
                console.log('Login Failed');
              }} 
            />
            <br />
          </div>
        )}
        <div>
          <i>Cast APP, OhTu-projekti 2023</i>
        </div>
      </Router>
    </Container>
  )
}

export default App
