import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
const store = configureStore({
    reducer: {
      notifications:notificationReducer
    },
})

console.log(store.getState())

export default store
