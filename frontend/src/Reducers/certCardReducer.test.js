import certCardReducer from './certCardReducer'
import deepFreeze from 'deep-freeze'

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
    selectedNewCertificate: { id: 0, certificate: "" },
    newValidUntil: null,
  }

describe('certCardReducer', ()=>{
    test('returns new state with action certCard/updateEditability', () => { 
        const state = initialState
        const action = {
            type: "certCard/updateEditability",
            payload: true
        }
    
        deepFreeze(state)
        const newState = certCardReducer(state,action)
    
        expect(newState.editable).toEqual(action.payload)    
    })

    test('returns new state with action certCard/updateAddCState', () => { 
        const state = initialState
        const action = {
            type: "certCard/updateAddCState",
            payload: true
        }
    
        deepFreeze(state)
        const newState = certCardReducer(state,action)
    
        expect(newState.addCertActivated).toEqual(action.payload)    
    })
})
