import { createSlice } from "@reduxjs/toolkit"
import integrationService from "../Services/integrationService"

const initialState = {
  allIntegrationTokens: null,
  integrationTokenName: "",
  integrationTokenValue: null,
  ttl: 86400,
}

const integrationSlice = createSlice({
  name: "integration",
  initialState,
  reducers: {
    updateintegrationTokenName(state, action) {
      return {
        ...state,
        integrationTokenName: action.payload
      }
    },
    updateintegrationTokenValue(state, action) {
      return {
        ...state,
        integrationTokenValue: action.payload
      }
    },
    updateintegrationTokenTtl(state, action) {
      return {
        ...state,
        ttl: action.payload
      }
    },
    setAllIntegrationTokens(state,action){
      return{
        ...state,
        allIntegrationTokens: action.payload
      }
    }
  },
})

export const initializeIntegrationTokenTB = () => {
  return async (dispatch) => {
    const integrationToken = await integrationService.getAllTokens()
    dispatch(setAllIntegrationTokens(integrationToken))
  }
}

export const {
  updateintegrationTokenName,
  updateintegrationTokenValue,
  updateintegrationTokenTtl,
  setAllIntegrationTokens,
} = integrationSlice.actions

export default integrationSlice.reducer