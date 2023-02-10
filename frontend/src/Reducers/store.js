import { configureStore } from "@reduxjs/toolkit"
import consultantReducer from "./consultantReducer"
import userReducer from "./userReducer"

// import anecdoteReducer from './anecdoteReducer'
// import notificationReducer from './notificationReducer'
// import filterReducer from './filterReducer'

const store = configureStore({
  reducer: {
    consultants: consultantReducer,
    user: userReducer,
  },
})

export default store
