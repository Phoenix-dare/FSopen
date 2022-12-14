import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
const store = configureStore({
    reducer: {
      notifications:notificationReducer,
      blogs:blogReducer,
      user:userReducer
    },
})

console.log(store.getState())

export default store
