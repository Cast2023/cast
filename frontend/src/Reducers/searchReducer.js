import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  nameFilter: "",
  techFilter: "",
  projectFilter: "",
  extentedSearch: false
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setNameFilter(state, action) {
      state.nameFilter = action.payload
    },
    setTechFilter(state, action){
      state.techFilter = action.payload
  },
  },
})


export const { setNameFilter } = searchSlice.actions
export const { setTechFilter } = searchSlice.actions
export default searchSlice.reducer
