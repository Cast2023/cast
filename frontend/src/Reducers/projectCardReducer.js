import { createSlice } from "@reduxjs/toolkit"
import projectService from "../Services/projectService"
import consultantService from "../Services/consultantService"

const initialState = {
  newProjectId: null,
  newProjectAllocation: null,
  newProjectStartDate: null,
  newProjectEndDate: null,
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
      newProject.userId,
      newProject
    )
    //dispatch(setUserProjects(addedProject))
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
