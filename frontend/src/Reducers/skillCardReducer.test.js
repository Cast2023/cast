import skillCardReducer  from "./skillCardReducer";
import deepFreeze from 'deep-freeze'

const initialState = {
  editable: false,
  newSkillAddable: false,
  skillChanges: [],
  addableSkillDetail: null,//{new_skill_level: "", new_skill_name: ""}
  allSkills: null,//from consultant
}

describe('skillCardReducer', ()=>{

  test('returns new state with action skillCard/updateEditability', () => { 
    const state = initialState
    const action = {
      type: "skillCard/updateEditability",
      payload: true
    }

    deepFreeze(state)
    const newState = skillCardReducer(state,action)
    expect(newState).toEqual({...state, editable: true})
  })

  test('returns new state with action skillCard/updateNewSkillAddability', () => { 
    const state = initialState
    const action = {
      type: "skillCard/updateNewSkillAddability",
      payload: true
    }

    deepFreeze(state)
    const newState = skillCardReducer(state,action)
    expect(newState).toEqual({...state, newSkillAddable: true})
  })

  test('returns new state with action skillCard/setSkillChanges when changing the skill level', () => { 
    const state = initialState
    const payload = [
      {
          "tech": "4",
          "skill_level": "1"
      },
      {
        "tech": "4",
        "skill_level": "2"
      }
    ]

    const action = {
      type: "skillCard/setSkillChanges",
      payload: payload
    }

    deepFreeze(state)
    const newState = skillCardReducer(state,action)
    expect(newState).toEqual({...state, skillChanges: payload})
  })

  test('returns new state with action skillCard/setSkillChanges when changing the preference', () => { 
    const state = initialState
    const payload = [
      {
          "tech": "4",
          "skill_level": "1"
      },
      {
        "tech": "4",
        "skill_level": "2"
      },
      {
        "tech": "4",
        "skill_level": "2",
        "tech_preference": "false"
      }

    ]

    const action = {
      type: "skillCard/setSkillChanges",
      payload: payload
    }

    deepFreeze(state)
    const newState = skillCardReducer(state,action)
    expect(newState).toEqual({...state, skillChanges: payload})
  })

  test('returns new state with action skillCard/addableSkillDetail', () => { 
    const state = initialState
    const payload = {
      "new_skill_name": "Java",
      "new_skill_level": "1"
    }

    const action = {
      type: "skillCard/setAddableSkillDetail",
      payload: payload
    }

    deepFreeze(state)
    const newState = skillCardReducer(state,action)
    expect(newState).toEqual({...state, addableSkillDetail: payload})
  })

  test('returns new state with action skillCard/addableSkillDetail', () => { 
    const state = initialState
    const payload = {
      "new_skill_name": "Java",
      "new_skill_level": "1"
    }

    const action = {
      type: "skillCard/setAddableSkillDetail",
      payload: payload
    }

    deepFreeze(state)
    const newState = skillCardReducer(state,action)
    expect(newState).toEqual({...state, addableSkillDetail: payload})
  })

  test('returns new state with action skillCard/setUserSkills', () => { 
    const state = initialState
    const payload = [
      {
          "skill_level": 1,
          "tech": 4,
          "tech_name": "C++",
          "tech_preference": true
      },
      {
          "skill_level": 1,
          "tech": 15,
          "tech_name": "pytorch",
          "tech_preference": false
      },
      {
          "skill_level": 1,
          "tech": 16,
          "tech_name": "tensorflow",
          "tech_preference": true
      },
      {
          "skill_level": 1,
          "tech": 17,
          "tech_name": "sklearn",
          "tech_preference": null
      },
      {
          "skill_level": 1,
          "tech": 18,
          "tech_name": "1",
          "tech_preference": null
      },
      {
          "skill_level": 1,
          "tech": 19,
          "tech_name": "2",
          "tech_preference": null
      },
      {
          "skill_level": 1,
          "tech": 20,
          "tech_name": "3",
          "tech_preference": null
      },
      {
          "skill_level": 1,
          "tech": 21,
          "tech_name": "python3",
          "tech_preference": null
      },
      {
          "skill_level": 1,
          "tech": 22,
          "tech_name": "python2",
          "tech_preference": null
      }
    ]

    const action = {
      type: "skillCard/setUserSkills",
      payload: payload
    }

    deepFreeze(state)
    const newState = skillCardReducer(state,action)
    expect(newState).toEqual({...state, userSkills: payload})
  })

})