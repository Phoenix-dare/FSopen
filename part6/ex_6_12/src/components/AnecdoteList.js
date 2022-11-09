import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification,removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdote)
    const toFilter=useSelector(state =>state.filter)
    const filterRegex = new RegExp(toFilter,'gi')
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <div>

            {anecdotes.filter(item => filterRegex.test(item.content)).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {vote(anecdote.id)
        dispatch(setNotification(`You voted for: ${anecdote.content}`))
        setTimeout(()=>dispatch(removeNotification("")),5000)
                        }}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList