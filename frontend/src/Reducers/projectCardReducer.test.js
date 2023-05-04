import projectCardReducer from './projectCardReducer'
import deepFreeze from 'deep-freeze'

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

describe('projectCardReducer', ()=>{
    test('returns new state with action projectCard/updateAddState', () => { 
        const state = initialState
        const action = {
            type: "projectCard/updateAddState",
            payload: true
        }
    
        deepFreeze(state)
        const newState = projectCardReducer(state,action)
    
        expect(newState.addProjectActivated).toEqual(action.payload)    
    })

    test('returns new state with action projectCard/updateEditState', () => { 
        const state = initialState
        const action = {
            type: "projectCard/updateEditState",
            payload: true
        }
    
        deepFreeze(state)
        const newState = projectCardReducer(state,action)
    
        expect(newState.editProjectsActivated).toEqual(action.payload)    
    })
})
