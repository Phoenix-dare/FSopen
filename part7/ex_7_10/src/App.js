import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import { manageNotification } from './reducers/notificationReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const blogFormRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const checkUser = window.localStorage.getItem('evanesco')
        if (checkUser) {
            const user = JSON.parse(checkUser)
            setUser(user)
        }
    }, [])
    const errorStyle = {
        fontSize: '16px',
        color: 'black',
        background: 'red',
        borderColor: 'black',
    }
    const successStyle = {
        font: '16px',
        color: 'black',
        background: 'lightgreen',
        borderColor: 'black',
    }

    const handleUsername = ({ target }) => setUsername(target.value)
    const handlePassword = ({ target }) => setPassword(target.value)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            blogService.setToken(user.token)
            window.localStorage.setItem('evanesco', JSON.stringify(user))
            dispatch(manageNotification({
                type: 'success',
                message: 'Login Successful',
            },5))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            dispatch(manageNotification({
                type: 'error',
                message: 'Wrong credentials',
            },5))
        }
        return
    }
    const handleLogout = () => {
        window.localStorage.removeItem('evanesco')
        setUser(null)
        dispatch(manageNotification({
            type: 'success',
            message: 'Logout Successful',
        },5))
    }

    const addBlog = async (newBlog) => {
        try {
            const added = await blogService.createBlog(newBlog)
            setBlogs(blogs.concat(added))
            blogFormRef.current.toggleVisibility()
            dispatch(manageNotification({
                type: 'success',
                message: 'New blog created',
            },5))
        } catch (error) {
            dispatch(manageNotification({
                type: 'error',
                message: "Something went wrong.Blog couldn't be created",
            },5))
        }
        return
    }

    const addLike = async (blog, id) => {
        const updatedBlog = {
            ...blog,
            user: blog.user.id,
            likes: blog.likes + 1,
        }

        try {
            const updatedLike = await blogService.updateBlog(updatedBlog, id)
            setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedLike)))
            dispatch(manageNotification({
                type: 'success',
                message: `you liked ${blog.title}`,
            },5))
        } catch (error) {
            dispatch(manageNotification({
                type: 'error',
                message: "Couldn't update",
            },5))
        }
    }
    const removeBlog = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this blog?')) {
                await blogService.deleteBlog(id)
                const afterRemoved = blogs.filter((blog) => blog.id !== id)
                setBlogs(afterRemoved)
                dispatch(manageNotification({
                    type: 'success',
                    message: 'blog successfully removed',
                },5))
            }
           
        } catch (error) {
            console.error(error)
            dispatch(manageNotification({
                type: 'error',
                message: `Couldn't delete${error.message}`,
            },5))
        }
    }

    return (
        <div>
            <div>
                {user === null ? (
                    <LoginForm
                        username={username}
                        password={password}
                        handleLogin={handleLogin}
                        handlePassword={handlePassword}
                        handleUsername={handleUsername}
                    />
                ) : (
                    <div>
                        <h4>hello,{user.name}</h4>
                        <button onClick={handleLogout}>logout</button>
                        <Togglable
                            buttonLabel='Create a new blog'
                            ref={blogFormRef}
                        >
                            <BlogForm addBlog={addBlog} />
                        </Togglable>
                    </div>
                )}
                <Notifications
                    errorStyle={errorStyle}
                    successStyle={successStyle}
                />
            </div>

            <h2>blogs</h2>
            <div className='blog-container'>
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            addLike={addLike}
                            removeBlog={removeBlog}
                            user={user}
                        />
                    ))}
            </div>
        </div>
    )
}

export default App
