import { Routes, Route } from "react-router-dom"
import Roboroute from "./Roboroute"
import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { initializeConsultants } from "../Reducers/consultantReducer"
import { initializeUser } from "../Reducers/sessionReducer"

import SuccessCallback from "../Services/authenticationService"
import { setActiveSession } from "../Reducers/sessionReducer"

const AuthRoutes = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <div>Start by logging in: </div>
      <br />
      <Routes>
        <Route path="/roboroute" element={<Roboroute />} />
      </Routes>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          SuccessCallback({
            credentialResponse,
          }).then(
            dispatch(setActiveSession(true)),
            dispatch(initializeUser(5)),
            dispatch(initializeConsultants())
          )
        }}
        onError={() => {
          console.log("Login Failed")
        }}
      />
      <br />
    </div>
  )
}

export default AuthRoutes
