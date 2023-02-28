import { configureStore } from "@reduxjs/toolkit"
import consultantReducer from "./consultantReducer"
import sessionReducer from "./sessionReducer"
import searchReducer from "./searchReducer"

const store = configureStore({
  reducer: {
    consultants: consultantReducer,
    session: sessionReducer,
    search: searchReducer,
  },
})

export default store
