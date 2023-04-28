import { Routes, Route } from "react-router-dom"
import Roboroute from "./Roboroute"
import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { initializeConsultants } from "../Reducers/consultantReducer"
import {
  initializeUser,
  setToken,
  setActiveSession,
} from "../Reducers/sessionReducer"
import authenticationService from "../Services/authenticationService"
import { initializeProjects } from "../Reducers/projectCardReducer"

const AuthRoutes = () => {
  const dispatch = useDispatch()
  const userInitialization = (authToken, APIToken, userId) => {
    dispatch(setActiveSession(true))
    dispatch(initializeUser(userId, APIToken))
    dispatch(initializeConsultants(APIToken))
    dispatch(initializeProjects())
    dispatch(setToken(`${authToken}`))
  }
  
  useEffect(() => {
    const authToken = window.localStorage.getItem("authToken")

    if (authToken) {
      authenticationService.verifyToken(authToken).then((response) => {
        const userId = response.data[0]
        const authToken = response.data[1] 
        const APIToken = response.data[2]
        
        window.localStorage.setItem("authToken", authToken)
        window.localStorage.setItem("APIToken", APIToken)

        userInitialization(authToken, APIToken, userId)
      })
    } 
  }, [])
  return (
    <div>
      <div>Start by logging in: </div>
      <br />
      <Routes>
        <Route path="/roboroute" element={<Roboroute />} />
      </Routes>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          authenticationService
            .successCallback({
              credentialResponse,
            })
            .then((response) => {
              const userId = response.data[0]
              const authToken = response.data[1] 
              const APIToken = response.data[2]
              
              window.localStorage.setItem("authToken", authToken)
              window.localStorage.setItem("APIToken", APIToken)
              userInitialization(authToken, APIToken, userId)

              
            })
        }}
        onError={() => {
          
        }}
      />
    </div>
  )
}

export default AuthRoutes
