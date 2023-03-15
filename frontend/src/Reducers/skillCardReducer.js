import { createSlice } from "@reduxjs/toolkit"
import techService from "../Services/techService"

const initialState = {
  editable: false,
  newSkillAddable: false,
  allSkills: [],
  addableSkill: null,//{new_skill_level: "", new_skill_name: ""}

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
    setAddableSkill(state, action){
      return{
        ...state,
        addableSkill: action.payload
      }
    },
    setAllSkills(state,action) {
      return {
        ...state,
        allSkills: action.payload
      }
    }
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
  setAddableSkill,
  setAllSkills
} = skillCardSlice.actions

export default skillCardSlice.reducer

