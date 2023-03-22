import { createSlice } from "@reduxjs/toolkit"
import projectService from "../Services/projectService"

const initialState = {
  editProjectsActivated: false,
  addProjectActivated: false,
  allProjects: [],
  newProjectToAdd: null,
}

const projectCardSlice = createSlice({
  name: "projectCard",
  initialState,
  reducers: {
    updateEditState(state, action) {
      return {
        ...state,
        editProjectsActivated: action.payload,
      }
    },
    updateAddState(state, action) {
      return {
        ...state,
        addProjectActivated: action.payload,
      }
    },
    setAllProjects(state, action) {
      return {
        ...state,
        allProjects: action.payload,
      }
    },
  },
})

export const initializeProjects = () => {
  return async (dispatch) => {
    const projects = await projectService.getAllProjects()
    dispatch(setAllProjects(projects))
  }
}

export const { setAllProjects, updateEditState, updateAddState } =
  projectCardSlice.actions

export default projectCardSlice.reducer
