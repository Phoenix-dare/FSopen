import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
name:'filter',
initialState:null,
reducers:{
filterBy(state,action){
    return action.payload
    
//return getState.filter(item =>item.content === filterInput)


},
}

})
export const{ filterBy } = filterSlice.actions
export default filterSlice.reducer