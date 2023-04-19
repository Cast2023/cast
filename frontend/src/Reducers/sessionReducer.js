import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"
import { setSelectedConsultant, setActiveConsultant } from "./consultantReducer"

// User-id is set to 1 for now to highlight if the correct user info is not fecthed from database
const initialState = {
  activeSession: false,
  token: null,
  activeUserId: null,
  // activeUser: [],
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // setActiveUser(state, action) {
    //   return {
    //     ...state,
    //     activeUser: action.payload,
    //   }
    // },
    setActiveSession: (state, action) => {
      state.activeSession = action.payload
    },
    setToken: (state, action) => {
      let token = null
      token = action.payload
      
      state.token = token//`Bearer ${action.payload}`
      // state.token = jwt.sign(state.activeUserId, process.env.SECRET)
      // 
    },
    setActiveUserId: (state, action) => {
      state.activeUserId = action.payload
      // initializeUser(action.payload)
    },
  },
})

export const initializeUser = (id, APIToken) => {
  
  
  return async (dispatch) => {
    const user = await consultantService.getSelectedConsultant(id, APIToken)
    
    // dispatch(setSelectedConsultant(user))
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
