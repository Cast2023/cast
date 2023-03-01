import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"

const initialState = {
  allConsultants: [],
  filteredConsultants: [],
  selectedConsultant: [],
  activeConsultant: [],
}

const consultantSlice = createSlice({
  name: "consultants",
  initialState,
  reducers: {
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
    updateFilteredConsultantsByName(state, action) {
      const searchTerm = action.payload
      state.filteredConsultants = state.allConsultants.filter((consultant) => {
        return (
          // consultant.first_name
          //   .toLowerCase()
          //   .includes(searchTerm.toLowerCase()) ||
          // consultant.last_name
          //   .toLowerCase()
          //   .includes(searchTerm.toLowerCase()) ||
          consultant.first_name
            .concat(" ", consultant.last_name)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      })
    },
    setSelectedConsultant(state, action) {
      state.selectedConsultant = action.payload
    },
    setActiveConsultant(state, action) {
      state.activeConsultant = action.payload
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

export const {
  setAllConsultants,
  setFilteredConsultants,
  updateFilteredConsultantsByName,
  setSelectedConsultant,
  setActiveConsultant,
} = consultantSlice.actions

export default consultantSlice.reducer
