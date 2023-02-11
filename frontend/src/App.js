import { Container } from "@mui/material"
import { BrowserRouter as Router } from "react-router-dom"

import AppRoutes from "./Components/AppRoutes"
import AuthRoutes from "./Components/AuthRoutes"
import AppHeader from "./Components/AppHeader"
import AppFooter from "./Components/AppFooter"

import { useSelector } from "react-redux"

const App = () => {
  const activeSession = useSelector((state) => state.session.activeSession)

  return (
    <Container>
      <Router>
        <AppHeader />
        {activeSession ? <AppRoutes /> : <AuthRoutes />}
        <AppFooter />
      </Router>
    </Container>
  )
}

export default App
