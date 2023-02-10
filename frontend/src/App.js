import { Container, Toolbar, AppBar, IconButton, Button } from "@mui/material"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom"
import React, { useState, useEffect } from "react"
import Home from "./Components/Home"
import Profile from "./Components/Profile"
import Search from "./Components/Search"
import Api from "./Components/Api"
import MyTeam from "./Components/MyTeam"
import axios from "axios"

import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { initializeConsultants } from "./Reducers/consultantReducer"
import { initializeUser } from "./Reducers/userReducer"

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
    if (promiseresponse.data[0] === "Just keep swimming.") {
      console.log("Token matches")
      setSessionState(true)
      const userId = promiseresponse.data[2]
      console.log(userId)
      handleInitializeUser(userId)
    }
  })
  console.log("Response", result)

  return result
}

const handleInitializeUser = async (id) => {
  initializeUser(id)
}

const App = () => {
  const dispatch = useDispatch()
  // const [consult, setConsult] = useState([])
  const [sessionState, setSessionState] = useState(false)

  const Roboroute = ({ setSessionState }) => {
    setSessionState(true)
    return <Navigate to="/" />
  }

  useEffect(() => {
    dispatch(initializeConsultants())
  }, [dispatch])

  // useEffect(() => {
  //   ConsultService.getAllConsults().then((consults) => {
  //     setConsult(consults)
  //   })
  // }, [])

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
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  id="profile"
                >
                  profile
                </Button>
                <Button color="inherit" component={Link} to="/api" id="api">
                  api
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/myteam"
                  id="myteam"
                >
                  my team
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/search"
                  id="search"
                >
                  search
                </Button>
              </Toolbar>
            </AppBar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/api" element={<Api />} />
              <Route path="/myteam" element={<MyTeam />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        ) : (
          <div>
            <div>Start by logging in: </div>
            <br />
            <Routes>
              <Route
                path="/roboroute"
                element={<Roboroute setSessionState={setSessionState} />}
              />
            </Routes>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                successCallback({ credentialResponse, setSessionState })
              }}
              onError={() => {
                console.log("Login Failed")
              }}
            />
            <br />
          </div>
        )}
        <div>
          <br />
          <i>Cast APP, OhTu-projekti 2023</i>
        </div>
      </Router>
    </Container>
  )
}

export default App
