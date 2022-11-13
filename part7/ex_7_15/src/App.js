import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import { manageNotification } from './reducers/notificationReducer'
import { getBlog, addNewblog } from './reducers/blogReducer'
import { logoutUser, saveUser } from './reducers/authReducer'
import { getUsers } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
    const blogFormRef = useRef()

    const dispatch = useDispatch()
    const user = useSelector((state) => state.loggedUser)
    const allUsers = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getBlog())
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        const checkUser = window.localStorage.getItem('evanesco')
        checkUser
            ? dispatch(saveUser(JSON.parse(checkUser)))
            : dispatch(saveUser(null))
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

    const handleLogout = () => {
        window.localStorage.removeItem('evanesco')
        dispatch(logoutUser(null))
        dispatch(
            manageNotification(
                {
                    type: 'success',
                    message: 'Logout Successful',
                },
                5
            )
        )
    }

    const addBlog = async (newBlog) => {
        try {
            dispatch(addNewblog(newBlog))
            blogFormRef.current.toggleVisibility()
            dispatch(
                manageNotification(
                    {
                        type: 'success',
                        message: 'New blog created',
                    },
                    5
                )
            )
        } catch (error) {
            dispatch(
                manageNotification(
                    {
                        type: 'error',
                        message:
                            "Something went wrong.Blog couldn't be created",
                    },
                    5
                )
            )
        }
        return
    }

    return (
        <Router>
            <div>
                <div>
                    {user === null ? (
                        <LoginForm />
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
            </div>
            <Routes>
                <Route path='/user/:id' element={<BlogList />} />
                <Route path='/users' element={<Users allUsers={allUsers} />} />
                <Route path='/' element={<Blogs user={user} />} />
            </Routes>
        </Router>
    )
}

export default App
