import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"

const initialState = {
  activeSession: false,
  token: null,
  activeUserId: 1,
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
    setToken(state, action) {
      return {
        token: action.payload,
      }
    },
    setActiveUserId: (state, action) => {
      state.activeUserId = action.payload
      initializeUser(action.payload)
    },
  },
})

export const initializeUser = (id) => {
  console.log("USER: ", id)
  return async (dispatch) => {
    const user = await consultantService.getSelectedConsultant(id)
    dispatch(setActiveUser(user))
  }
}

export const { setToken, setActiveUserId, setActiveSession, setActiveUser } =
  sessionSlice.actions

export const selectSessionState = (state) => state.session.activeSession
export const selectSessionUser = (state) => state.session.activeUserId

export default sessionSlice.reducer
