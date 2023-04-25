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
//import verifyToken from "../Services/authenticationService"
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
  console.log("here")
  useEffect(() => {
    //example in part5 uses JSON, here we test with token strin first
    const authToken = window.localStorage.getItem("authToken")

    if (authToken) {
      authenticationService.verifyToken(authToken).then((response) => {
        //console.log('response.data[0]: ', response.data[0])
        const userId = response.data[0]
        const authToken = response.data[1] //may utilize the value from response //now it is same to credentialResponse.credential's value
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
              //now inside SuccessCallback only have axios.get().. we may also need to implement axios.post
              credentialResponse,
            })
            .then((response) => {
              //need to apply response when backend side is handeled
              const userId = response.data[0]
              const authToken = response.data[1] //may utilize the value from response //now it is same to credentialResponse.credential's value
              const APIToken = response.data[2]
              
              //saving the tokens to the browser's local storage
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
