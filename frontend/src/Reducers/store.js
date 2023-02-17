import { configureStore } from "@reduxjs/toolkit"
import consultantReducer from "./consultantReducer"
import sessionReducer from "./sessionReducer"

const store = configureStore({
  reducer: {
    consultants: consultantReducer,
    session: sessionReducer,
  },
})

export default store
