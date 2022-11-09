import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'


const initialState = []


const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const { id }= action.payload
      const findAnecdote = state.find(item => item.id === id)

      const voted = {
        ...findAnecdote,
        votes: findAnecdote.votes + 1
      }
      return state.map(item =>
        item.id !== id ? item : voted
      ).sort((a, b) => b.votes - a.votes)

    },

    newAnecdote(state, action) {
      const content = action.payload
      return state.concat(content)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { newAnecdote, voteAnecdote, setAnecdote } = anecdoteSlice.actions

export const getAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch(setAnecdote(data))
  }
}
export const createNewAnecdote = (toAdd) => {
  return async dispatch => {
    const addedAnecdote= await anecdoteService.createAnecdote({content:toAdd,votes:0})
    dispatch(newAnecdote(addedAnecdote))
  
  }
   }

   export const addVote = (content,id) => {
    return async dispatch => {
      const updatedAnnecdote = await anecdoteService.updateAnecdote(content,id)
      dispatch(voteAnecdote(updatedAnnecdote))
    }

}


export default anecdoteSlice.reducer

