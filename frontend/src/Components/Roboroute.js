import { initializeUser, setActiveSession } from "../Reducers/sessionReducer"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { initializeConsultants } from "../Reducers/consultantReducer"

const Roboroute = () => {
  const dispatch = useDispatch()
  window.localStorage.setItem("APIToken", "token")
  dispatch(setActiveSession(true))
  dispatch(initializeConsultants())
  dispatch(initializeUser(5))
  dispatch(initializeConsultants())
  return <Navigate to="/" />
}

export default Roboroute
