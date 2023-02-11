import { Container } from "@mui/material"
import { BrowserRouter as Router } from "react-router-dom"

import AppRoutes from "./Components/AppRoutes"
import AuthRoutes from "./Components/AuthRoutes"

import { useSelector } from "react-redux"

const App = () => {
  const activeSession = useSelector((state) => state.session.activeSession)

  return (
    <Container>
      <Router>
        <div>
          <h1>Competency, Allocation and Skill tracker</h1>
        </div>

        {activeSession ? (
          <div>
            <AppRoutes />
          </div>
        ) : (
          <div>
            <AuthRoutes />
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
