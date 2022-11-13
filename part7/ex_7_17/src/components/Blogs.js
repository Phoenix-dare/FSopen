import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Blog from './Blog'

const Blogs = ({ user }) => {
    const blogs = useSelector((state) => state.blogs)

    return (
        <>
            <h2>blogs</h2>
            <Link to={'/users'}>
                <h2>Users</h2>
            </Link>

            <div className='blog-container'>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} user={user} />
                ))}
            </div>
        </>
    )
}
export default Blogs
