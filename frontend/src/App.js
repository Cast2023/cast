import { useSelector } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Container } from "@mui/material"

import AppRoutes from "./Components/AppRoutes"
import AuthRoutes from "./Components/AuthRoutes"
import AppHeader from "./Components/AppHeader"
import AppFooter from "./Components/AppFooter"


const App = () => {
  const activeSession = useSelector((state) => state.session.activeSession)
  
  return (
    <Container maxWidth="xl">
      <Router>
        <AppHeader />
        {activeSession ? <AppRoutes /> : <AuthRoutes />}
        <AppFooter />
      </Router>
    </Container>
  )
}

export default App
