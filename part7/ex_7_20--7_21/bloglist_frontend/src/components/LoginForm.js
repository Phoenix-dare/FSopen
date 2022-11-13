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
                        message: error.message,
                    },
                    5
                )
            )
        }
        return
    }

    return (
        <div className='bg-orange-200 flex items-center  flex-column py-12 px-4 '>
            <form
                onSubmit={handleLogin}
                className='flex flex-col justify-evenly content-between gap-4 flex-wrap'
            >
                <div className='ml-2 px-2 block text-sm text-gray-900 '>
                    username
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={handleUsername}
                        className='username bg-zinc-100 w-auto h-auto rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shadow-sm'
                    />
                </div>
                <div className='ml-2 px-2 block text-sm text-gray-900 '>
                    password
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        onChange={handlePassword}
                        className='password bg-zinc-100 w-auto h-auto rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 shadow-sm'
                    />
                </div>
                <button
                    type='submit'
                    className='login-button relative 
            flex w-full justify-center rounded-md 
            border border-transparent bg-indigo-600 py-2 px-4 text-sm 
            font-medium text-white hover:bg-indigo-700 focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-500 focus:ring-offset-2'
                >
                    login
                </button>
            </form>
        </div>
    )
}
export default LoginForm
