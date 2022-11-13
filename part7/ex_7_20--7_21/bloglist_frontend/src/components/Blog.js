import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
    return (
        <div className='blogs bg-cyan-200 py-2 mt-2 mb-2 border-amber-100 border-4 shadow-md shadow-emerald-300 rounded-md divide-neutral-400'>
            <Link to={`/blog/${blog.id}`}>
                <h2 className='blog-title text-2xl py-2 px-2 underline decoration-dotted '>
                    {blog.title}
                </h2>
            </Link>
            <h3 className='blog-author text-xl align-baseline'>
                {' '}
                by {blog.author}
            </h3>
        </div>
    )
}

export default Blog
