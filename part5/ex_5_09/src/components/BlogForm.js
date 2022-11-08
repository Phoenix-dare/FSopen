import { useState } from 'react'
import blogService from '../services/blogs'
const BlogForm = ({setMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
  const addBlog = async (e) => {
    e.preventDefault()
    try {
      await blogService.createBlog({
        title,
        author,
        url,

      })
      setMessage({
        type: 'success',
        message: 'New blog created'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (error) {
      setMessage({
        type: 'error',
        message: 'Something went wrong.Blog couldn\'t be created'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    return
  }
  
   
   
    return(

    <form onSubmit={addBlog}>
      <label>title
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label><br></br>
      <label>url
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label><br></br>
      <label>author
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label><br></br>

      <button type="submit">save</button>
    </form>

  )}

  export default BlogForm