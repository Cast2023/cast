import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"
// const initializeFilterdUser = () => {
//   return async (dispatch) =>{
//     allConsultants = await consultantService.getAllConsultants()
//   }
// }

const initialState = {
  consultantName: "",
  projectName:"",
  // filteredUsers: "",
  extentedSearch: false

}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchFilter(state, action) {
      state.consultantName = action.payload
    },
    // setFilteredUsers(state, action) {
    //   return {
    //     ...state,
    //     filteredUsers: action.payload,
    //   }
    // },
  },
})



// export const initializeFilteredUsers = () => {
//   return async (dispatch) => {
//     const users = await consultantService.getAllConsultants()
//     dispatch(setFilteredUsers(users))
//   }
// }

// export const initializeConsultants = () => {
//   return async (dispatch) => {
//     const consultants = await consultantService.getAllConsultants()
//     dispatch(setConsultants(consultants))
//   }
// }

export const { setSearchFilter } = searchSlice.actions
export default searchSlice.reducer
