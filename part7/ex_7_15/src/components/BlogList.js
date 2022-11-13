import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
    const id = useParams().id
    const user = useSelector((state) =>
        state.users
            ? state.users.find((item) => item.id.toString() === id)
            : null
    )

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{`${user.name}'s Blogs`}</h2>
            {user.blogs.map((blog) => (
                <div key={blog.id}>{blog.title}</div>
            ))}
        </div>
    )
}

export default BlogList
