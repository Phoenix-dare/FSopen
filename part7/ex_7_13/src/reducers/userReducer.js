import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'


const initialState = null || window.localStorage.getItem('evanesco')


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
   currentUser(state,action){
    const user = action.payload

    return user
   },
   saveUser(state,action){
    return action.payload
   },
   logoutUser(state,action){
    return action.payload
   }
   }
})

export const { currentUser,saveUser,logoutUser } = userSlice.actions

export const getUser = (userDetails) => {
    return async dispatch => {
        const user = await loginService.login(userDetails)   
        dispatch(currentUser(user))
        window.localStorage.setItem('evanesco', JSON.stringify(user))

        
    }
}


export default userSlice.reducer

