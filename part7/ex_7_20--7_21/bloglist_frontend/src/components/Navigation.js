import { Link } from 'react-router-dom'
const Navigation = () => {
    return (
        <div className='bg-cyan-400 '>
            <Link
                to='/'
                className='font-sans hover:font-serif font-semibold ml-1 px-7'
            >
                Blogs
            </Link>
            {'  '}
            <Link
                to='/users'
                className='font-sans hover:font-serif font-semibold ml-1 px-7'
            >
                Users
            </Link>
        </div>
    )
}
export default Navigation
