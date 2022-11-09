import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { manageNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

 
    const addAnecdote = async (e) => {
        e.preventDefault()
        const toAdd=e.target.anecdote.value
        e.target.anecdote.value=''
        dispatch(createNewAnecdote(toAdd))
        dispatch(manageNotification(`Awesome!You created a new anecdote: ${toAdd}`,6))
        
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