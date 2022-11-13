import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { manageNotification } from '../reducers/notificationReducer'
import { getUser } from '../reducers/authReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate
    const dispatch = useDispatch()

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

            dispatch(
                manageNotification(
                    {
                        type: 'success',
                        message: 'Login Successful',
                    },
                    5
                )
            )
            setUsername('')
            setPassword('')
            navigate('/')

        } catch (error) {
            dispatch(
                manageNotification(
                    {
                        type: 'error',
                        message: 'Wrong credentials',
                    },
                    5
                )
            )
        }
        return
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={handleUsername}
                    className='username'
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={handlePassword}
                    className='password'
                />
            </div>
            <button type='submit' className='login-button'>
                login
            </button>
        </form>
    )
}
export default LoginForm
