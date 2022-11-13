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

        if (comment.length > 0) {
            dispatch(addComment(newComment, id))
        }
        setComment('')
        navigate(`/blog/${id}`)
    }

    return (
        <div className='py-2 '>
            <div className='flex py-2 px-2'>
                <h4 className='text-m py-2'>Comments</h4>
                <form onSubmit={handleComment} className='py-2'>
                    <input
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                        placeholder='add a comment..'
                        className='border-2 border-violet-200 rounded-md shadow-inner w-auto h-auto bg-gray-100'
                    ></input>
                    <button
                        type='submit'
                        className='relative 
            flex w-full justify-center rounded-md 
            border border-transparent bg-indigo-600 py-2 px-4 text-sm 
            font-medium text-white hover:bg-indigo-700 focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        Add comment
                    </button>
                </form>
            </div>
            {comments &&
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className='flex flex-col  border-2 rounded-xl border-gray-500 bg-yellow-100'
                    >
                        <p className='text-sm px-2 py-1'>{comment.comments}</p>
                    </div>
                ))}
        </div>
    )
}

export default Comments
