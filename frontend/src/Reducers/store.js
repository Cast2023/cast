import { configureStore } from "@reduxjs/toolkit"
import consultantReducer from "./consultantReducer"
import sessionReducer from "./sessionReducer"
import searchReducer from "./searchReducer"
import skillCardReducer from "./skillCardReducer"
import projectCardReducer from "./projectCardReducer"
import certCardReducer from "./certCardReducer"

const store = configureStore({
  reducer: {
    consultants: consultantReducer,
    session: sessionReducer,
    search: searchReducer,
    skillCard: skillCardReducer,
    projectCard: projectCardReducer,
    certCard: certCardReducer,
  },
})

export default store
