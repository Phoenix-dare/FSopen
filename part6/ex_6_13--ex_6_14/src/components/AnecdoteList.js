import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const toFilter = useSelector(state => state.filter)
    const filterRegex = new RegExp(toFilter, 'gi')

    const anecdotes = useSelector(state => toFilter ?
        state.anecdote.filter(item => filterRegex.test(item.content)) : state.anecdote)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <div>

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            vote(anecdote.id)
                            dispatch(setNotification(`You voted for: ${anecdote.content}`))
                            setTimeout(() => dispatch(removeNotification("")), 5000)
                        }}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList