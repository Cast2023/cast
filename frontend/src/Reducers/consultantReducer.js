import { createSlice } from "@reduxjs/toolkit";
import consultantService from "../Services/consultantService";

const consultantSlice = createSlice({
    name : 'consultants',
    initialState : [],
    reducers:{
        setConsultants(state, action) {
            return action.payload
        }
    },
})



export const initializeConsultants = () =>{
    return async dispatch => {
        const consultants = await consultantService.getAllConsultants()
        dispatch(setConsultants(consultants))
    }
}

export const { setConsultants} = consultantSlice.actions
export default consultantSlice.reducer