import consultantReducer  from "./consultantReducer";
import deepFreeze from 'deep-freeze'
const initialState = {
    allConsultants: [],
    filteredConsultants: [],
    selectedConsultant: [],
  }

describe('consultantReducer', ()=>{
    test('returns new state with action consultants/setAllConsultants', () => { 
        const state = initialState
        const action = {
            type: "consultants/setAllConsultants",
            payload: 
            [   { "id": 1,
            "skills": [
                {
                    "skill_level": 1,
                    "tech": 1,
                    "tech_name": "Python"
                },
                {
                    "skill_level": 3,
                    "tech": 2,
                    "tech_name": "Java"
                },
                {
                    "skill_level": 1,
                    "tech": 3,
                    "tech_name": "JavaScript"
                },
                {
                    "skill_level": 2,
                    "tech": 4,
                    "tech_name": "C++"
                },
                {
                    "skill_level": 3,
                    "tech": 5,
                    "tech_name": "TypeScript"
                },
                {
                    "skill_level": 2,
                    "tech": 6,
                    "tech_name": "CSS"
                },
                {
                    "skill_level": 1,
                    "tech": 7,
                    "tech_name": "Fortran"
                },
                {
                    "skill_level": 3,
                    "tech": 9,
                    "tech_name": "Haskell"
                },
                {
                    "skill_level": 2,
                    "tech": 14,
                    "tech_name": "Docker"
                }
            ],
            "first_name": "Bruce",
            "last_name": "Banner",
            "email": "hulk@gmail.com",
            "phone_number": "+358501234567",
            "location_country": "Finland",
            "location_city": "Helsinki",
            "worktime_allocation": 100,
            "allocation_until": "2029-12-31",
            "wants_to_do": "I like participating in projects concerning various sectors, so hope to continue having an opportunity for that kind of variety.(long text)",
            "wants_not_to_do": "I prefer projects that last less than a year. However, if the project is international, I would like to participate in it regardless of the expected duration. (long text)"
        },
            {},
            {},
            ]
                
        }
    
        deepFreeze(state)
        const newSetConsultantsState = consultantReducer(state,action)
    
        expect(newSetConsultantsState.allConsultants).toHaveLength(3)
        expect(newSetConsultantsState.allConsultants).toEqual(action.payload)    
     })
     
})
