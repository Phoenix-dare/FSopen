import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { manageNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const toFilter = useSelector(state => state.filter)
    const filterRegex = new RegExp(toFilter, 'gi')

    const anecdotes = useSelector(state => toFilter ?
        state.anecdote.filter(item => filterRegex.test(item.content)) : state.anecdote)
    const dispatch = useDispatch()

    const handleVotes = (anecdote) => {
        const updateVotes = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        dispatch(addVote(updateVotes, anecdote.id))

        dispatch(manageNotification(`You voted for: ${anecdote.content}`,5))
      
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
                        <button onClick={() => handleVotes(anecdote)
                        }>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList