import { configureStore } from '@reduxjs/toolkit'
import consultantReducer from './consultantReducer'

// import anecdoteReducer from './anecdoteReducer'
// import notificationReducer from './notificationReducer'
// import filterReducer from './filterReducer'

const store = configureStore({
    reducer: {
        consultants : consultantReducer
    }
  })

export default store