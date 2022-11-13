import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = ({ user }) => {
    const blogs = useSelector((state) => state.blogs)

    return (
        <div className='flex flex-col blog-container  w-auto h-3/4 bg-lime-100'>
            <h2 className='font-semibold text-2xl decoration-stone-300 text-center'>
                Blogs
            </h2>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </div>
    )
}
export default Blogs
