import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification,removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

 
    const addAnecdote = async (e) => {
        e.preventDefault()
        const toAdd=e.target.anecdote.value
        e.target.anecdote.value=''
        const addedAnecdote= await anecdoteService.createAnecdote({content:toAdd,votes:0})
        dispatch(newAnecdote(addedAnecdote))
        dispatch(setNotification(`Awesome!You created a new anecdote: ${toAdd}`))
        setTimeout(()=>dispatch(removeNotification("")),5000)
        
      }
    
    return (
<div>
<h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
</div>
    )
}
export default AnecdoteForm