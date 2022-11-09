import { useSelector, useDispatch } from 'react-redux'
import { newAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const addAnecdote = (e) => {
    e.preventDefault()
    const toAdd=e.target.anecdote.value
    e.target.anecdote.value=''
    dispatch(newAnecdote(toAdd))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b)=>b.votes-a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm addAnecdote={addAnecdote} />
      </div>
  )
}

export default App