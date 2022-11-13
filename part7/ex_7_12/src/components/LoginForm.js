const LoginForm = ({
    username,
    password,
    handleLogin,
    handleUsername,
    handlePassword,
}) => {
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
