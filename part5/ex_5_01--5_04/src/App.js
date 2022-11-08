import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const checkUser = window.localStorage.getItem('evanesco')
    if (checkUser) {
      const user = JSON.parse(checkUser)
      setUser(user)
    }
  }, [])
  const errorStyle = {
    fontSize: "16px",
    color: "black",
    background: "red",
    borderColor: "black"

  }
  const successStyle = {
    font: "16px",
    color: "black",
    background: "lightgreen",
    borderColor: "green"

  }




  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'evanesco', JSON.stringify(user)
      )
      setMessage({
        type: 'success',
        message: 'Login Successful'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setMessage({
        type: 'error',
        message: 'Wrong credentials'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    return
  }
  const handleLogout = () => {
    window.localStorage.removeItem('evanesco')
    setUser(null)
    setMessage({
      type: 'success',
      message: 'Logout Successful'
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }



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

  const loginForm = () => (

    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>

  )

  const blogForm = () => (

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

  )
  const Notifications = () => {
    return (
      <>
        <span style={(message && message.type === 'error') ? errorStyle : successStyle}>
          {message !== null ? message.message : null
          }</span>

      </>
    )
  }

  return (
    <div>
      <div>
        {user === null ? loginForm() :
          (<div>
            <h4>hello,{user.name}</h4>
            <button onClick={handleLogout}>logout</button>
            {blogForm()}
          </div>
          )
      }
          <Notifications />

      </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App
