import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"

// User-id is set to 1 for now to highlight if the correct user info is not fecthed from database
const initialState = {
  activeSession: false,
  token: null,
  activeUserId: null,
  activeUser: [],
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setActiveUser(state, action) {
      return {
        ...state,
        activeUser: action.payload,
      }
    },
    setActiveSession: (state, action) => {
      state.activeSession = action.payload
    },
    setToken: (state, action) =>{
      let token = null
      token = `Bearer ${action.payload}`
      console.log('token is:', token)
      // state.token = jwt.sign(state.activeUserId, process.env.SECRET)
      // console.log("token is: ",state.token)
    },
    setActiveUserId: (state, action) => {
      state.activeUserId = action.payload
      initializeUser(action.payload)
    },
  },
})

export const initializeUser = (id) => {
  //console.log("USER: ", id)
  return async (dispatch) => {
    const user = await consultantService.getSelectedConsultant(id) //replace id with number to get some test data person to browser
    dispatch(setActiveUser(user))
  }
}

export const { setToken, setActiveUserId, setActiveSession, setActiveUser } =
  sessionSlice.actions

export const selectSessionState = (state) => state.session.activeSession
export const selectSessionUser = (state) => state.session.activeUserId
export const selectSessionToken = (state) => state.session.token

export default sessionSlice.reducer
