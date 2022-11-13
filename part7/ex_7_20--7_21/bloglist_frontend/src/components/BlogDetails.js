import { useSelector, useDispatch } from 'react-redux'
import { blogLike, removeBlog } from '../reducers/blogReducer'
import { manageNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import Comments from './Comments'

const BlogDetails = ({ user }) => {
    const id = useParams().id

    const blog = useSelector((state) =>
        state.blogs
            ? state.blogs.find((item) => item.id.toString() === id)
            : null
    )

    const dispatch = useDispatch()

    const handleLikes = async () => {
        addLike(blog, blog.id)
    }

    const handleDelete = () => {
        toRemoveBlog(blog.id)
    }
    const addLike = async (blog, id) => {
        const updatedBlog = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1,
        }

        try {
            dispatch(blogLike(updatedBlog, id))
            dispatch(
                manageNotification(
                    {
                        type: 'success',
                        message: `you liked ${blog.title}`,
                    },
                    5
                )
            )
        } catch (error) {
            dispatch(
                manageNotification(
                    {
                        type: 'error',
                        message: "Couldn't update",
                    },
                    5
                )
            )
        }
    }
    const toRemoveBlog = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this blog?')) {
                dispatch(removeBlog(id))
                dispatch(
                    manageNotification(
                        {
                            type: 'success',
                            message: 'blog successfully removed',
                        },
                        5
                    )
                )
            }
        } catch (error) {
            console.error(error)
            dispatch(
                manageNotification(
                    {
                        type: 'error',
                        message: `Couldn't delete${error.message}`,
                    },
                    5
                )
            )
        }
    }

    if (!blog) {
        return null
    }

    return (
        <>
            <div className='flex flex-col items-center bg-cyan-200 py-2 mt-2 mb-2 border-amber-100 border-4 shadow-md shadow-emerald-300 rounded-md divide-neutral-400'>
                <h2 className='text-6xl px-4 py-4'>{blog.title}</h2>
                <h3 className='text-4xl px-4 py-4 italic'>{blog.author}</h3>
                <a href={blog.url} className='text-2xl underline  px-4 py-4'>
                    {blog.url}
                </a>
                <p className='text-m px-4 py-4'>likes:{blog.likes}</p>
                <button
                    onClick={handleLikes}
                    className='likebutton  relative 
            flex w-full justify-center rounded-md 
            border border-transparent bg-indigo-600 py-2 px-4 text-sm 
            font-medium text-white hover:bg-indigo-700 focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-500 focus:ring-offset-2'
                >
                    like👍🏻
                </button>
                {(blog.user.username === 'username' ||
                    (user && blog.user.username === user.username)) && (
                    <button
                        onClick={handleDelete}
                        className='deletebutton relative bg-red-400
                    flex w-full justify-center rounded-md 
                    border border-transparent  py-2 px-4 text-sm 
                    font-medium text-white hover:bg-red-700 focus:outline-none 
                    focus:ring-2 
                    focus:ring-red-500 focus:ring-offset-2'
                    >
                        delete
                    </button>
                )}
                <Comments blog={blog} />
            </div>
        </>
    )
}

export default BlogDetails
