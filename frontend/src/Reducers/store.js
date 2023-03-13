import { configureStore } from "@reduxjs/toolkit"
import consultantReducer from "./consultantReducer"
import sessionReducer from "./sessionReducer"
import searchReducer from "./searchReducer"
import skillCardReducer from "./skillCardReducer"

const store = configureStore({
  reducer: {
    consultants: consultantReducer,
    session: sessionReducer,
    search: searchReducer,
    skillCard: skillCardReducer,
  },
})

export default store
