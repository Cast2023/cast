import consultantReducer  from "./consultantReducer";
import deepFreeze from 'deep-freeze'

describe('consultantReducer', ()=>{
    test('returns new state with action consultants/setConsultants', () => { 
        const state = []
        const action = {
            payload: 
            Array({  id: 1, 
                skills: ["JavaScript", "python"],
                first_name: 'Aapo',
                last_name: 'Karhunen',
                email: '123@123.com'},
            {},
            {},
            ),
            type: "consultants/setConsultants"
        }
    
        deepFreeze(state)
        const newSetConsultantsState = consultantReducer(state,action)
    
        expect(newSetConsultantsState).toHaveLength(3)
        expect(newSetConsultantsState).toEqual(action.payload)    
     })

})
