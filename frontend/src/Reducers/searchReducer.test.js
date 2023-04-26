import consultantReducer  from "./searchReducer";
import deepFreeze from 'deep-freeze'
import searchReducer from "./searchReducer";
const initialState = {
    nameFilter: "",
    projectFilter: "",
    extentedSearch: false
  }


describe('consultantReducer', ()=>{
    test('returns new state with action search/setNameFilter', () => { 
        const state = initialState
        const action = {
            type: "search/setNameFilter",
            payload: "A"
                
        }

        deepFreeze(state)
        const newSearchState = searchReducer(state,action)

        expect(newSearchState.nameFilter).toEqual(action.payload)
    })
})
