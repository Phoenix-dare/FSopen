import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
name:'user',
initialState:null,
reducers:{
    allUsers(state,action) {
        const users = action.payload
        return users
    }



}
}) 
export const { allUsers } = userSlice.actions 

export const getUsers = () => {
    return async dispatch =>{
        const users = await userService.getAllUsers()
        dispatch(allUsers(users))
    }
}
export default userSlice.reducer



