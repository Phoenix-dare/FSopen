import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  
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
    borderColor: "black"

  }



  const handleUsername = ({ target }) => setUsername(target.value)
  const handlePassword = ({ target }) => setPassword(target.value)
 
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




  

  
 
  return (
    <div>
      <div>
        {user === null ? <LoginForm 
        username={username}
        password={password}
        handleLogin={handleLogin}
        handlePassword={handlePassword}
        handleUsername={handleUsername} /> :
          (<div>
            <h4>hello,{user.name}</h4>
            <button onClick={handleLogout}>logout</button>
            <Togglable buttonLabel="Create a new blog">

            <BlogForm setMessage={ setMessage }/>
            </Togglable>
           
          </div>
          )
      }
          <Notifications 
          errorStyle={errorStyle} 
          successStyle={successStyle}
          message={message}/>

      </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App
