import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newBlog = {
            title,
            author,
            url,
        }
        setTitle('')
        setAuthor('')
        setUrl('')
        navigate('/')
        addBlog(newBlog)
    }
    BlogForm.propTypes = {
        addBlog: PropTypes.func.isRequired,
    }
    return (
        <div className='bg-slate-400 flex items-center  flex-column py-12 px-4 '>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col justify-evenly content-between gap-4 flex-wrap'
            >
                <label className='ml-2 px-2 block text-sm text-gray-900 '>
                    title{' '}
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        className='title-input bg-zinc-100 w-auto h-auto rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shadow-sm'
                    />
                </label>
                <br></br>
                <label className='ml-2 mr-2 px-2 block text-sm text-gray-900 '>
                    url{' '}
                    <input
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        className='url-input bg-zinc-100 w-auto h-auto rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shadow-sm'
                    />
                </label>
                <br></br>
                <label className='ml-2 mr-2 px-2 block text-sm text-gray-900 py-2 m'>
                    author{' '}
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        className='author-input bg-zinc-100 w-auto h-auto rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shadow-sm'
                    />
                </label>
                <br></br>

                <button
                    className='submit-button 
            group relative 
            flex w-full justify-center rounded-md 
            border border-transparent bg-indigo-600 py-2 px-4 text-sm 
            font-medium text-white hover:bg-indigo-700 focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-500 focus:ring-offset-2'
                    type='submit'
                >
                    save
                </button>
            </form>
        </div>
    )
}

export default BlogForm
