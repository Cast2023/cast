import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"

const userSlice = createSlice({
  name: "user",
  initialState: ["nOMnOm"],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const initializeUser = (id) => {
  console.log("USER: ", id)
  return async (dispatch) => {
    const user = await consultantService.getSelectedConsultant(id)
    dispatch(setUser(user))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
