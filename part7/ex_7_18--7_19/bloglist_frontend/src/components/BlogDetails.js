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
            <div>
                <h2>{blog.title}</h2>
                <h3>{blog.author}</h3>
                <a href={blog.url}>{blog.url}</a>
                <p>likes:{blog.likes}</p>
                <button onClick={handleLikes} className='likebutton'>
                    like👍🏻
                </button>
                {(blog.user.username === 'username' ||
                    (user && blog.user.username === user.username)) && (
                    <button onClick={handleDelete} className='deletebutton'>
                        delete
                    </button>
                )}
                <Comments blog={blog} />
            </div>
        </>
    )
}

export default BlogDetails
