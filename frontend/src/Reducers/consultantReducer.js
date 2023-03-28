import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"
import techService from "../Services/techService"
import certificateService from "../Services/certificateService"

const initialState = {
  allConsultants: [],
  filteredConsultants: [],
  filteredName: "",
  filteredSkills: [],
  filteredCertificates: [],
  activeConsultant: [],
  allCertificates: [],
  allTechSkills: [],
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
    setAllCertificates(state, action) {
      return {
        ...state,
        allCertificates: action.payload,
      }
    },
    setAllTechSkills(state, action) {
      return {
        ...state,
        allTechSkills: action.payload,
      }
    },
    setFilteredConsultants(state, action) {
      return {
        ...state,
        filteredConsultants: action.payload,
      }
    },
    setFilteredSkills(state, action) {
      return {
        ...state,
        filteredSkills: action.payload,
      }
    },
    setFilteredName(state, action) {
      return {
        ...state,
        filteredName: action.payload,
      }
    },
    updateFilteredConsultants(state, action) {
      state.filteredConsultants = state.allConsultants
        .filter((consultant) => {
          return consultant.first_name
            .concat(" ", consultant.last_name)
            .toLowerCase()
            .includes(state.filteredName.toLowerCase())
        })
        .filter((user) => {
          if (state.filteredSkills.length === 0) {
            return true
          } else {
            return state.filteredSkills.every((skillName) => {
              return user.skills.some(
                (skill) => skill.tech_name === skillName.label
              )
            })
          }
        })
        .filter((user) => {
          if (state.filteredCertificates.length === 0) {
            return true
          } else {
            return state.filteredCertificates.every((certName) => {
              return user.certificates.some(
                (cert) => cert.certificate === certName
              )
            })
          }
        })
    },
    setActiveConsultant(state, action) {
      return {
        ...state,
        activeConsultant: action.payload,
      }
    },
  },
})

export const initializeConsultants = () => {
  return async (dispatch) => {
    const consultants = await consultantService.getAllConsultants()
    dispatch(setAllConsultants(consultants))
    const certificates = await certificateService.getAllCertificates()
    dispatch(setAllCertificates(certificates))
    const techSkills = await techService.getAllTechs()
    dispatch(setAllTechSkills(techSkills))
    dispatch(setFilteredConsultants(consultants))
  }
}

export const {
  setAllConsultants,
  setFilteredConsultants,
  updateFilteredConsultants,
  setSelectedConsultant,
  setActiveConsultant,
  setAllCertificates,
  setAllTechSkills,
  setFilteredName,
  setFilteredSkills,
} = consultantSlice.actions

export default consultantSlice.reducer
