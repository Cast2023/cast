import { Routes, Route } from "react-router-dom"
import Roboroute from "./Roboroute"
import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { initializeConsultants } from "../Reducers/consultantReducer"
import { initializeUser, setToken, setActiveSession } from "../Reducers/sessionReducer"
import authenticationService from "../Services/authenticationService"
import verifyToken from "../Services/authenticationService"


const AuthRoutes = () => {
  const dispatch = useDispatch()
  const userInitialization = (token, userId) =>{
    dispatch(setActiveSession(true))
    dispatch(initializeUser(userId))
    dispatch(initializeConsultants())
    dispatch(setToken(`${token}`))
  }
    useEffect(() => {
    //example in part5 uses JSON, here we test with token strin first
    const token = window.localStorage.getItem('token')//its setItem can be found from Component/AppRoutes.js
    console.log('useEffect token: ', token)
    if (token) {
      authenticationService.verifyToken({token}).then(response =>{
        //console.log('response.data[0]: ', response.data[0])
        userInitialization(token, response.data[0])
      }
      )
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
          console.log("CredentialResponse",credentialResponse)
          authenticationService.successCallback({ //now inside SuccessCallback only have axios.get().. we may also need to implement axios.post 
            credentialResponse,
          }).then( response =>{
            //need to apply response when backend side is handeled
            console.log("login response", response)
            const newToken = response.data[1]//may utilize the value from response //now it is same to credentialResponse.credential's value
            userInitialization(newToken, response.data[0])
            //saving the token to the browser's local storage
            window.localStorage.setItem('token', newToken)
          }
          )
        }}
        onError={() => {
          console.log("Login Failed")
        }}
      />
    </div>
  )
}

export default AuthRoutes
