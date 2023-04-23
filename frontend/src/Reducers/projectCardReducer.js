import { createSlice } from "@reduxjs/toolkit"
import projectService from "../Services/projectService"
import consultantService from "../Services/consultantService"

const initialState = {
  addProjectActivated: false,
  editProjectsActivated: false,
  allProjects: [],
  userProjects: [],
  newProjectId: null,
  newProjectAllocation: null,
  newProjectStartDate: null,
  newProjectEndDate: null,
  projectChanges: [],
}

const projectCardSlice = createSlice({
  name: "projectCard",
  initialState,
  reducers: {
    updateAddState(state, action) {
      return {
        ...state,
        addProjectActivated: action.payload,
      }
    },
    updateEditState(state, action) {
      return {
        ...state,
        editProjectsActivated: action.payload,
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
    setNewProjectId(state, action) {
      return {
        ...state,
        newProjectId: action.payload,
      }
    },
    setNewProjectAllocation(state, action) {
      return {
        ...state,
        newProjectAllocation: action.payload,
      }
    },
    setNewProjectStartDate(state, action) {
      return {
        ...state,
        newProjectStartDate: action.payload,
      }
    },
    setNewProjectEndDate(state, action) {
      return {
        ...state,
        newProjectEndDate: action.payload,
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
    const sortedProjects = projects.sort((a, b) => a.project_name.localeCompare(b.project_name))
    dispatch(setAllProjects(sortedProjects))
  }
}

export const initializeProjectCard = (id) => {
  return async (dispatch) => {
    const consultant = await consultantService.getSelectedConsultant(id)
    const userProjects = consultant.projects
    dispatch(setUserProjects(userProjects))
    dispatch(updateAddState(false))
    dispatch(updateEditState(false))
  }
}

export const addNewProject = (newProject) => {
  return async (dispatch) => {
    const addedProject = await consultantService.editConsultant(
      newProject.userId,
      newProject
    )
    dispatch(updateAddState(false))
  }
}

export const resetNewProjectData = () => {
  return async (dispatch) => {
    dispatch(setNewProjectId(null))
    dispatch(setNewProjectAllocation(null))
    dispatch(setNewProjectStartDate(null))
    dispatch(setNewProjectEndDate(null))
  }
}

export const {
  setAllProjects,
  setUserProjects,
  setNewProjectId,
  setNewProjectAllocation,
  setNewProjectStartDate,
  setNewProjectEndDate,
  setProjectChanges,
  updateAddState,
  updateEditState,
} = projectCardSlice.actions

export default projectCardSlice.reducer
