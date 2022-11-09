import { createSlice } from '@reduxjs/toolkit'


const initialState = []


const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState,
  reducers:{
    voteAnecdote(state,action) {
      const id = action.payload
      const findAnecdote = state.find(item => item.id === id)

      const voted = {
        ...findAnecdote,
        votes: findAnecdote.votes + 1
      }
       return state.map(item =>
        item.id !== id ? item : voted
      ).sort((a,b) => b.votes-a.votes)
      
      },

    newAnecdote(state,action){
      const content = action.payload
      return state.concat(content)
      },
      addAnecdote(state, action) {     
         return action.payload
           }
    }
  })

  export const { newAnecdote, voteAnecdote,addAnecdote } = anecdoteSlice.actions
  export default anecdoteSlice.reducer

