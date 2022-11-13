import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingLeft: 5,
        paddingBottom: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 10,
        background: 'lightcyan',
        borderRadius: 15,
    }

    return (
        <div className='blogs' style={blogStyle}>
            <Link to={`/blog/${blog.id}`}>
                <h2 className='blog-title'>{blog.title}</h2>
            </Link>
            <h3 className='blog-author'> by {blog.author}</h3>
        </div>
    )
}

export default Blog
