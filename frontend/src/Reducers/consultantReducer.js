import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"

const initialState = {
  allConsultants: [],
  filteredConsultants: [],
}

const consultantSlice = createSlice({
  name: "consultants",
  initialState,
  reducers: {
    // setConsultants(state, action) {
    //   return action.payload
    // },
    setAllConsultants(state, action) {
      return {
        ...state,
        allConsultants: action.payload,
      }
    },
    setFilteredConsultants(state, action) {
      return {
        ...state,
        filteredConsultants: action.payload,
      }
    },
  },
})

export const initializeConsultants = () => {
  return async (dispatch) => {
    const consultants = await consultantService.getAllConsultants()
    dispatch(setAllConsultants(consultants))
    dispatch(setFilteredConsultants(consultants))
  }
}

export const { setAllConsultants, setFilteredConsultants} = consultantSlice.actions
export default consultantSlice.reducer
