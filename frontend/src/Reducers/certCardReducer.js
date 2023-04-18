import { createSlice } from "@reduxjs/toolkit"
import certificateService from "../Services/certificateService"
import consultantService from "../Services/consultantService"

const initialState = {
  editable: false,
  newCertAddable: false,
  certChanges: [],
  addableCertDetail: null,
  addCertState: false,
  allCerts: null,
  addCertActivated: false,
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
    setAddCertState(state, action){
      return{
        ...state,
        addCertState: action.payload
      }
    },
    setAllCerts(state,action){
      return{
        ...state,
        allCerts: action.payload
      }
    },
    updateAddCState(state, action) {
      return {
        ...state,
        addCertActivated: action.payload,
      }
    },
  },
})

export const initializeCertCard = (id) => {
  return async (dispatch) => {
    const consultant = await consultantService.getSelectedConsultant(id)
    const certs = consultant.certificates
    dispatch(setAllCerts(certs))
    dispatch(updateEditability(false))
  }
}

export const addNewCert = (newCert) => {
  return async (dispatch) => {
    const addedCert = await consultantService.editConsultant(
      newCert.id,
      newCert
    )
    dispatch(setAllCerts(addedCert))
    dispatch(updateAddCState(false))
  }
}

export const {
  updateEditability,
  updateNewCertAddability,
  setCertChanges,
  setAddableCertDetail,
  setAddCertState,
  setAllCerts,
  updateAddCState,
} = certCardSlice.actions

export default certCardSlice.reducer