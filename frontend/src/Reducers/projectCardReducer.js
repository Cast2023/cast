import { createSlice } from "@reduxjs/toolkit"
import projectService from "../Services/projectService"
import consultantService from "../Services/consultantService"

const initialState = {
  editProjectsActivated: false,
  addProjectActivated: false,
  allProjects: [],
  userProjects: [],
  newProjectToAdd: null,
  projectChanges: [],
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
    setUserProjects(state, action) {
      return {
        ...state,
        userProjects: action.payload,
      }
    },
    setProjectChanges(state,action) {
      return {
        ...state,
        projectChanges: action.payload
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

export const initializeProjectCard = (id) => {
  return async (dispatch) => {
    const consultant = await consultantService.getSelectedConsultant(id)
    const userProjects = consultant.projects
    dispatch(setUserProjects(userProjects))
    dispatch(updateEditState(false))
    dispatch(updateAddState(false))
    dispatch(setProjectChanges([]))
  }
}

export const addNewProject = (newProject) => {
  return async (dispatch) => {
    const addedProject = await consultantService.editConsultant(
      newProject.id,
      newProject
    )
    dispatch(setAllProjects(addedProject))
    dispatch(updateAddState(false))
  }
}

export const {
  setAllProjects,
  setUserProjects,
  updateEditState,
  updateAddState,
  setProjectChanges
} = projectCardSlice.actions

export default projectCardSlice.reducer
