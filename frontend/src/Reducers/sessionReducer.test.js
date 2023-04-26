import sessionReducer  from "./sessionReducer";
import deepFreeze from 'deep-freeze'

const initialState = {
  activeSession: false,
  token: null,
  activeUserId: null,
}


describe('sessionReducer', ()=>{

  test('returns new state with action session/setActiveUserId', () => { 
    const state = initialState
    const action = {
      type: 'session/setActiveUserId',
      payload: "999"
    } 
    deepFreeze(state)
    const newState = sessionReducer(state,action)
    expect(newState).toEqual({...state, activeUserId:"999"})
  })

  test('returns new state with action session/setActiveSession', () => { 
    const state = initialState
    const action = {
      type: "session/setActiveSession",
      payload: true
    }
    deepFreeze(state)
    const newState = sessionReducer(state,action)
    expect(newState).toEqual({...state, activeSession: true})
  })


  test('returns new state with action session/setToken', () => { 
   const state = initialState
   const action = {
     type: "session/setToken",
     payload: "tokenToBeSet"
   }
   deepFreeze(state)
   const newState = sessionReducer(state, action)
   expect(newState).toEqual({...state, token: "tokenToBeSet"})
  })

})