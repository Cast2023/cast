import { Container } from "@mui/material"
import { BrowserRouter as Router } from "react-router-dom"

import AppRoutes from "./Components/AppRoutes"
import AuthRoutes from "./Components/AuthRoutes"
import Header from "./Components/Header"
import Footer from "./Components/Footer"

import { useSelector } from "react-redux"

const App = () => {
  const activeSession = useSelector((state) => state.session.activeSession)

  return (
    <Container>
      <Router>
        <Header />
        {activeSession ? <AppRoutes /> : <AuthRoutes />}
        <Footer />
      </Router>
    </Container>
  )
}

export default App
