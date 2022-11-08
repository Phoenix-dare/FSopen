import { useState } from 'react'


const BlogForm = ({addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
     const handleSubmit = (e) =>{
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
   
    return(

    <form onSubmit={handleSubmit}>
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