import {
  initializeUser,
  setActiveSession,
  setActiveUserId,
} from "../Reducers/sessionReducer"
import { initializeConsultants } from "../Reducers/consultantReducer"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

const Roboroute = () => {
  const dispatch = useDispatch()
  dispatch(setActiveSession(true))
  dispatch(initializeUser(5))
  dispatch(initializeConsultants())
  return <Navigate to="/" />
}

export default Roboroute
