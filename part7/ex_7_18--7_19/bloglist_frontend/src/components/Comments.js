import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment } from '../reducers/commentReducer'
import { useNavigate, useParams } from 'react-router-dom'
import { getAll } from '../reducers/commentReducer'

const Comments = ({ blog }) => {
    const id = useParams().id
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const comments = useSelector((state) => state.comments)

    useEffect(() => {
        if (blog) {
            dispatch(getAll(id))
        }
    }, [])

    const handleComment = (e) => {
        e.preventDefault()
        const newComment = {
            comment,
            id,
        }

        dispatch(addComment(newComment, id))
        setComment('')
        navigate(`/blog/${id}`)
    }

    return (
        <div>
            <div>
                <h4>Comments</h4>
                <form onSubmit={handleComment}>
                    <input
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                        placeholder='add a comment..'
                    ></input>
                    <button type='submit'>Add comment</button>
                </form>
            </div>
            {comments &&
                comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.comments}</p>
                    </div>
                ))}
        </div>
    )
}

export default Comments
