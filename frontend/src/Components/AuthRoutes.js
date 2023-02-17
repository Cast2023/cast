import { Routes, Route } from "react-router-dom"
import Roboroute from "./Roboroute"
import { GoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { initializeConsultants } from "../Reducers/consultantReducer"
import { initializeUser, setToken, setActiveSession } from "../Reducers/sessionReducer"

import SuccessCallback from "../Services/authenticationService"

const AuthRoutes = () => {
  const dispatch = useDispatch()
    useEffect(() => {
    //example in part5 uses JSON, here we test with token strin first
    const token = window.localStorage.getItem('token')//its setItem can be found from Component/AppRoutes.js
    console.log('useEffect token: ', token)
    if (token) {
      dispatch(setActiveSession(true))
      dispatch(initializeUser(5))
      dispatch(initializeConsultants())
      dispatch(setToken(`${token}`))
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
          SuccessCallback({ //now inside SuccessCallback only have axios.get().. we may also need to implement axios.post 
            credentialResponse,
          }).then( response =>{
            //need to apply response when backend side is handeled
            const newToken = "123"//may utilize the value from response
            dispatch(setActiveSession(true))
            dispatch(initializeUser(5))
            dispatch(initializeConsultants())
            dispatch(setToken(`${newToken}`))
            //saving the token to the browser's local storage
            window.localStorage.setItem('token', newToken)
            window.localStorage.getItem('token')

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
