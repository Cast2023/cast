import { createSlice } from "@reduxjs/toolkit"
import certificateService from "../Services/certificateService"
import consultantService from "../Services/consultantService"

const initialState = {
  editable: false,
  certChanges: [],
  addCertState: false,
  allConsultantCerts: [],
  addCertActivated: false,
  allCertificates: [],
  vendors: [],
  selectedNewVendor: "",
  selectedNewCertificateID: "",
  newValidUntil: null,
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
    setConsultantCerts(state, action) {
      return {
        ...state,
        allConsultantCerts: action.payload,
      }
    },
    setCertChanges(state, action) {
      return {
        ...state,
        certChanges: action.payload,
      }
    },
    setNewVendorId(state, action) {
      return {
        ...state,
        newVendorId: action.payload,
      }
    },
    setNewCertificateName(state, action) {
      return {
        ...state,
        newCertificateName: action.payload,
      }
    },
    setNewValidUntil(state, action) {
      return {
        ...state,
        newValidUntil: action.payload,
      }
    },
    updateAddCState(state, action) {
      return {
        ...state,
        addCertActivated: action.payload,
      }
    },
    setAllCertificates(state, action) {
      return {
        ...state,
        allCertificates: action.payload,
      }
    },
    setVendors(state, action) {
      return {
        ...state,
        vendors: action.payload,
      }
    },
    setSelectedNewVendor(state, action) {
      return {
        ...state,
        selectedNewVendor: action.payload,
      }
    },
    setSelectedNewCertificateID(state, action) {
      return {
        ...state,
        selectedNewCertificateID: action.payload,
      }
    },
  },
})

export const initializeCertCard = (id) => {
  return async (dispatch) => {
    const consultant = await consultantService.getSelectedConsultant(id)
    const certs = consultant.certificates
    const certificates = await certificateService.getAllCertificates()
    const vendors = [...new Set(certificates.map((cert) => cert.vendor))]
    dispatch(setConsultantCerts(certs))
    dispatch(updateEditability(false))
    dispatch(setAllCertificates(certificates))
    dispatch(setVendors(vendors))
  }
}

export const addNewCert = (newCert) => {
  return async (dispatch) => {
    const consultant = await consultantService.editConsultant(
      newCert.id,
      newCert
    )
    dispatch(setConsultantCerts(consultant.certificates))
    dispatch(updateAddCState(false))
  }
}

export const editCertificates = (cert) => {
  return async (dispatch) => {
    const editedCert = await consultantService.editConsultant(cert.id, cert)
    dispatch(setConsultantCerts(editedCert.certificates))
    dispatch(updateEditability(false))
    dispatch(setCertChanges([]))
  }
}

export const {
  updateEditability,
  setConsultantCerts,
  setCertChanges,
  setNewVendorId,
  setNewCertificateName,
  setNewValidUntil,
  updateAddCState,
  setAllCertificates,
  setVendors,
  setSelectedNewVendor,
  setSelectedNewCertificateID,
} = certCardSlice.actions

export default certCardSlice.reducer
