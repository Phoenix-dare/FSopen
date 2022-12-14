import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer:{
  anecdote:anecdoteReducer,
  notification:notificationReducer
  }
}
  )
  console.log(store.getState())

  export default store