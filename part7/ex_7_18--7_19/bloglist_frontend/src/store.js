import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import blogReducer from './reducers/blogReducer'
import commentReducer from './reducers/commentReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogReducer,
        loggedUser: authReducer,
        users: userReducer,
        comments: commentReducer,
    },
})

console.log(store.getState())

export default store
