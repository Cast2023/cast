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
    setAllCerts(state,action){
      return{
        ...state,
        allCerts: action.payload
      }
    },
    setCertChanges(state,action) {
      return {
        ...state,
        certChanges: action.payload
      }
    },
    updateNewCertAddability(state, action){
      return {
        ...state,
        newCertAddable: action.payload
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
    setNewVendorId(state, action){
      return{
        ...state,
        newVendorId: action.payload
      }
    },
    setNewCertificateName(state, action){
      return{
        ...state,
        newCertificateName: action.payload
      }
    },
    setNewValidUntil(state, action){
      return{
        ...state,
        newValidUntil: action.payload
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
  setAllCerts,
  setCertChanges,
  updateNewCertAddability,
  setAddableCertDetail,
  setAddCertState,
  setNewVendorId,
  setNewCertificateName,
  setNewValidUntil,
  updateAddCState,
} = certCardSlice.actions

export default certCardSlice.reducer