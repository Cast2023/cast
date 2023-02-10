import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"

const consultantSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const initializeUser = (id) => {
  return async (dispatch) => {
    const user = await consultantService.getSelectedConsultant(id)
    console.log("USER:")
    dispatch(setUser(user))
  }
}

export const { setUser } = consultantSlice.actions
export default consultantSlice.reducer
