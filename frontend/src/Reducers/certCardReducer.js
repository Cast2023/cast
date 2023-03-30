import { createSlice } from "@reduxjs/toolkit"
import techService from "../Services/techService"
import consultantService from "../Services/consultantService"

const initialState = {
  editable: false,
  newCertAddable: false,
  certChanges: [],
  addableCertDetail: null,//{new_skill_level: "", new_skill_name: ""}
  allCerts: null,//from consultant

}

const certCardSlice = createSlice({
  name: "certCard",
  initialState,
  reducers: {
    updateEditability(state, action) {
      return {
        ...state,
        editable: action.payload,
      }
    },
    updateNewCertAddability(state, action){
      return {
        ...state,
        newCertAddable: action.payload
      }
    },
    setCertChanges(state,action) {
      return {
        ...state,
        certChanges: action.payload
      }
    },
    setAddableCertDetail(state, action){
      return{
        ...state,
        addableCertDetail: action.payload
      }
    },
    setAllCerts(state,action){
      return{
        ...state,
        allCerts: action.payload
      }
    }
  },
})

export const initializeCertCard = (id) => {
  return async (dispatch) => {
    const consultant = await consultantService.getSelectedConsultant(id)
    const certs = consultant.certificates
    dispatch(setAllCerts(certs))
  }
}

export const {
  updateEditability,
  updateNewCertAddability,
  setCertChanges,
  setAddableCertDetail,
  setAllCerts
} = certCardSlice.actions

export default certCardSlice.reducer