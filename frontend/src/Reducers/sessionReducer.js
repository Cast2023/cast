import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"
import { setActiveConsultant } from "./consultantReducer"


const initialState = {
  activeSession: false,
  token: null,
  activeUserId: null,
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    
    setActiveSession: (state, action) => {
      state.activeSession = action.payload
    },
    setToken: (state, action) => {
      let token = null
      token = action.payload
      
      state.token = token
    },
    setActiveUserId: (state, action) => {
      state.activeUserId = action.payload
    },
  },
})

export const initializeUser = (id, APIToken) => {
  return async (dispatch) => {
    const user = await consultantService.getSelectedConsultant(id, APIToken)
    dispatch(setActiveConsultant(user))
    dispatch(setActiveUserId(id))
  }
}

export const { setToken, setActiveUserId, setActiveSession, setActiveUser } =
  sessionSlice.actions
export const selectSessionState = (state) => state.session.activeSession
export const selectSessionUser = (state) => state.session.activeUserId
export const selectSessionToken = (state) => state.session.token

export default sessionSlice.reducer
