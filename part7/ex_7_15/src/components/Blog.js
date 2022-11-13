import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { blogLike, removeBlog } from '../reducers/blogReducer'
import { manageNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
    const blogStyle = {
        paddingLeft: 5,
        paddingBottom: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 10,
        background: 'lightgreen',
        borderRadius: 15,
    }
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const toggleVisibility = () => {
        setVisible((prev) => !prev)
    }

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

    return (
        <div className='blogs' style={blogStyle}>
            <h2 className='blog-title'>{blog.title}</h2>
            <h3 className='blog-author'> by {blog.author}</h3>
            <button onClick={toggleVisibility} className='toggle'>
                {' '}
                Show {visible ? 'less' : 'more'}
            </button>
            {visible && (
                <>
                    <a href={blog.url}>link:-{blog.url}</a>
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
                </>
            )}
        </div>
    )
}
Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

}

export default Blog
