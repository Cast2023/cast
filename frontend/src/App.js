import { Container } from "@mui/material"
import { BrowserRouter as Router } from "react-router-dom"

import AppRoutes from "./Components/AppRoutes"
import AuthRoutes from "./Components/AuthRoutes"
import AppHeader from "./Components/AppHeader"
import AppFooter from "./Components/AppFooter"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { setActiveSession } from "./Reducers/sessionReducer"
// window.localStorage.removeItem('token')
const App = () => {
  const activeSession = useSelector((state) => state.session.activeSession)
  const userID = useSelector((state) => state.session.activeUserId)
  const token = useSelector((state) => state.session.token)

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
