import { createSlice } from "@reduxjs/toolkit"
import consultantService from "../Services/consultantService"
import techService from "../Services/techService"
import certificateService from "../Services/certificateService"

const initialState = {
  allConsultants: [],
  filteredConsultants: [],
  filteredName: "",
  filteredSkills: [],
  filteredSkillsInputValue: "",
  filteredCertificates: [],
  filteredCertificatesInputValue: "",
  filteredVendors: [],
  filteredVendorsInputValue: "",
  activeConsultant: [],
  allCertificates: [],
  allTechSkills: [],
  allVendors: [],
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
    setAllCertificates(state, action) {
      return {
        ...state,
        allCertificates: action.payload,
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
    setFilteredSkillsInputValue(state, action) {
      return {
        ...state,
        filteredSkillsInputValue: action.payload,
      }
    },
    setFilteredCertificates(state, action) {
      return {
        ...state,
        filteredCertificates: action.payload,
      }
    },
    setFilteredCertificatesInputValue(state, action) {
      return {
        ...state,
        filteredCertificatesInputValue: action.payload,
      }
    },
    setFilteredVendors(state, action) {
      return {
        ...state,
        filteredVendors: action.payload,
      }
    },
    setFilteredVendorsInputValue(state, action) {
      return {
        ...state,
        filteredVendorsInputValue: action.payload,
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
                (cert) => cert.certificate === certName.label
              )
            })
          }
        })
        .filter((user) => {
          if (state.filteredVendors.length === 0) {
            return true
          } else {
            return state.filteredVendors.every((certName) => {
              return user.certificates.some(
                (cert) => cert.vendor === certName.label
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
    setAllVendors(state, action) {
      return {
        ...state,
        allVendors: action.payload,
      }
    },
  },
})

export const initializeConsultants = (APIToken) => {
  
  return async (dispatch) => {
    const consultants = await consultantService.getAllConsultants(APIToken)
    dispatch(setAllConsultants(consultants))
    const certificates = await certificateService.getAllCertificates()
    dispatch(setAllCertificates(certificates))
    const setOfVendors = [...new Set(certificates.map((cert) => cert.vendor))]
    const vendors = setOfVendors.map((vendor, index) => {
      return { id: index, name: vendor }
    })
    dispatch(setAllVendors(vendors))
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
  setFilteredCertificates,
  setFilteredCertificatesInputValue,
  setFilteredVendors,
  setFilteredVendorsInputValue,
  setFilteredSkills,
  setFilteredSkillsInputValue,
  setAllVendors,
} = consultantSlice.actions

export default consultantSlice.reducer
