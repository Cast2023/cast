import { Container, Toolbar, AppBar, IconButton, Button } from "@mui/material"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./Components/Home"
import Profile from "./Components/Profile"
import Search from "./Components/Search"
import Api from "./Components/Api"
import MyTeam from "./Components/MyTeam"
import Roboroute from "./Components/Roboroute"

import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { initializeConsultants } from "./Reducers/consultantReducer"
import { initializeUser } from "./Reducers/sessionReducer"
import { useSelector } from "react-redux"

import SuccessCallback from "./Services/authenticationService"
import { setActiveSession } from "./Reducers/sessionReducer"

const App = () => {
  const dispatch = useDispatch()
  const activeSession = useSelector((state) => state.session.activeSession)

  return (
    <Container>
      <Router>
        <div>
          <h1>Competency, Allocation and Skill tracker</h1>
        </div>

        {activeSession ? (
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
              <Route path="/roboroute" element={<Roboroute />} />
            </Routes>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                SuccessCallback({
                  credentialResponse,
                }).then(
                  dispatch(setActiveSession(true)),
                  dispatch(initializeUser(5)),
                  dispatch(initializeConsultants())
                )
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
