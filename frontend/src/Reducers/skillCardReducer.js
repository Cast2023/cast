import { createSlice } from "@reduxjs/toolkit"
import techService from "../Services/techService"

const initialState = {
  editable: false,
  newSkillAddable: false,
  allSkills: [],
  addableSkillDetail: null,//{new_skill_level: "", new_skill_name: ""}

}

const skillCardSlice = createSlice({
  name: "skillCard",
  initialState,
  reducers: {
    updateEditability(state, action) {
      return {
        ...state,
        editable: action.payload,
      }
    },
    updateNewSkillAddability(state, action){
      return {
        ...state,
        newSkillAddable: action.payload
      }
    },
    setAllSkills(state,action) {
      return {
        ...state,
        allSkills: action.payload
      }
    },
    setAddableSkillDetail(state, action){
      return{
        ...state,
        addableSkillDetail : action.payload
      }
    },
  },
})

export const initializeSkillCard = () => {
  return async (dispatch) => {
    const consultants = await techService.getAllTechs()
    dispatch(setAllSkills(consultants))
  }
}

export const {
  updateEditability,
  updateNewSkillAddability,
  setAllSkills,
  setAddableSkillDetail,
} = skillCardSlice.actions

export default skillCardSlice.reducer

