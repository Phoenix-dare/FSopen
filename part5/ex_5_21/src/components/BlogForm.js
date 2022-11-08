import { useState } from 'react'
import PropTypes from 'prop-types'



const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    addBlog(newBlog)
  }
  BlogForm.propTypes ={
    addBlog:PropTypes.func.isRequired,
  }
  return(

    <form onSubmit={handleSubmit}>
      <label>title
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          className='title-input'
        />
      </label><br></br>
      <label>url
        <input
          value={url}
          onChange={({ target })  => setUrl(target.value)}
          className='url-input'
        />
      </label><br></br>
      <label>author
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          className='author-input'
        />
      </label><br></br>

      <button className ='submit-button' type="submit">save</button>
    </form>

  )}



export default BlogForm