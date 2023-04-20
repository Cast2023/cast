import { createSlice } from "@reduxjs/toolkit"
import integrationService from "../Services/integrationService"

const initialState = {
  allIntegrationTokens: null,
  integrationTokenName: "",
  integrationTokenValue: null,
  ttl: null,
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
    setAllIntegrationTokens(state,action){
      return{
        ...state,
        integrationToken: action.payload
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
  setAllIntegrationTokens,
} = integrationSlice.actions

export default integrationSlice.reducer