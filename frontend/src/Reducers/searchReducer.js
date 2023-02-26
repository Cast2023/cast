import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  nameFilter: "",
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
  },
})


export const { setNameFilter } = searchSlice.actions
export default searchSlice.reducer
