import sessionReducer  from "./sessionReducer";
import deepFreeze from 'deep-freeze'

const initialState = {
  activeSession: false,
  token: null,
  activeUserId: null,
  activeUser: null
}


describe('sessionReducer', ()=>{
  test('returns new state with action session/setActiveUser', ()=> {
    const state = initialState
    const activeUser = {
      "id": 5,
      "skills": [
          {
              "skill_level": 1,
              "tech": 2,
              "tech_name": "Java"
          },
          {
              "skill_level": 1,
              "tech": 4,
              "tech_name": "Fortran"
          },
          {
              "skill_level": 3,
              "tech": 6,
              "tech_name": "Haskell"
          }
      ],
      "first_name": "Gwen",
      "last_name": "Stacy",
      "email": "spidergwen@gmail.com",
      "phone_number": null,
      "location_country": null,
      "location_city": null,
      "worktime_allocation": null,
      "allocation_until": null,
      "wants_to_do": null,
      "wants_not_to_do": null
      }
    const activeSession = true
    const activeUserId = 5
    const token = "123"
    const action = {
      type: "session/setActiveUser",
      // payload: 5
      payload: {
        activeSession: null,
        activeUser: activeUser,
        activeUserId: null,
        token: null
      }
      
  }
    deepFreeze(state)
    const newState = sessionReducer(state,action)
    expect(newState).toEqual({...state, activeUser: action.payload})
  })


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


  //test('returns new state with action session/setToken', () => { 
  //  const state = initialState
  //  const action = {
  //    type: "session/setToken",
  //    payload: "tokenToBeSet"
  //  }
  //  deepFreeze(state)
  //  const newState = sessionReducer(state, action)
  //  expect(newState).toEqual({...state, token: "tokenToBeSet"})
  //})


  test('returns new state with action session/setActiveUserId', () => { 
  const state = initialState
  const action = {
    type: "session/setActiveUserId",
    payload: "5"
  }
  deepFreeze(state)
  const newState = sessionReducer(state,action)
  expect(newState).toEqual({...state, activeUserId:"5"})
  })

})