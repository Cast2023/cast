import {
  initializeUser,
  setActiveSession,
  setActiveUserId,
} from "../Reducers/sessionReducer"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

const Roboroute = () => {
  const dispatch = useDispatch()
  dispatch(setActiveSession(true))
  dispatch(initializeUser(5))
  return <Navigate to="/" />
}

export default Roboroute
