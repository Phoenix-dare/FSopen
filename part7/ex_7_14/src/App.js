import { useState, useEffect, useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Users from './components/Users'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import { manageNotification } from './reducers/notificationReducer'
import {  getBlog,addNewblog,blogLike,removeBlog } from './reducers/blogReducer'
import { getUser,logoutUser, saveUser } from './reducers/authReducer'
import { getUsers } from './reducers/userReducer'
import blogService from './services/blogs'



const App = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const blogFormRef = useRef()
    
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.loggedUser)
    
    

    useEffect(() => {
        dispatch(getBlog())
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        const checkUser = window.localStorage.getItem('evanesco')
        checkUser ? dispatch(saveUser(JSON.parse(checkUser))) : dispatch(saveUser(null))
        checkUser ? blogService.setToken(JSON.parse(checkUser).token) : null
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
            const logUser = {
                username,
                password,
            }
            dispatch(getUser(logUser))
            
            dispatch(manageNotification({
                type: 'success',
                message: 'Login Successful',
            },5))
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
        dispatch(logoutUser(null))
        dispatch(manageNotification({
            type: 'success',
            message: 'Logout Successful',
        },5))
    }

    const addBlog = async (newBlog) => {
        try {
            dispatch(addNewblog(newBlog))
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
            dispatch(blogLike(updatedBlog,id))
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
    const toRemoveBlog = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this blog?')) {
                dispatch(removeBlog(id))
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
            <Users />

            <h2>blogs</h2>
            <div className='blog-container'>
                {blogs
                    .map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            addLike={addLike}
                            toRemoveBlog={toRemoveBlog}
                            user={user}
                        />
                    ))}
            </div>
        </div>
    )
}

export default App
