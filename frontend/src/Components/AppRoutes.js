import { Toolbar, AppBar, IconButton, Button } from "@mui/material"
import { Routes, Route, Link, useMatch } from "react-router-dom"
import Home from "./Home"
import Profile from "./Profile"
import Search from "./Search"
import Api from "./Api"
import MyTeam from "./MyTeam"
import Logout from "./Logout"
import { useSelector } from "react-redux"

const AppRoutes = () => {
  const consultants = useSelector((state) => state.consultants.allConsultants)
  const match = useMatch("/profile/:id")
  const consultant = match
    ? consultants.find(
        (consultant) => consultant.id === Number(match.params.id)
      )
    : null
  const activeUser = useSelector(
    (state) => state.consultants.selectedConsultant
  )
  return (
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
          <Button color="inherit" component={Link} to="/profile" id="profile">
            profile
          </Button>
          <Button color="inherit" component={Link} to="/api" id="api">
            api
          </Button>
          <Button color="inherit" component={Link} to="/myteam" id="myteam">
            my team
          </Button>
          <Button color="inherit" component={Link} to="/search" id="search">
            search
          </Button>
          <Button color="inherit" component={Link} to="/logout" id="logout">
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile consultant={activeUser} />} />
        <Route
          path="/profile/:id"
          element={<Profile consultant={consultant} />}
        />
        <Route path="/api" element={<Api />} />
        <Route path="/myteam" element={<MyTeam />} />
        <Route path="/search" element={<Search />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
