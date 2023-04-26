import { initializeUser, setActiveSession } from "../Reducers/sessionReducer"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

const Logout = () => {
  const dispatch = useDispatch()
  dispatch(setActiveSession(false))
  window.localStorage.clear()
  return <Navigate to="/" />
}

export default Logout
