import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars

  const [ login, result ] = useMutation(LOGIN, {  
      onError: (error) => {console.log(error)
    }
  })
  

  useEffect(() => {    
    if ( result.data ) {      
    const token = result.data.login.value      
    props.setToken(token)     
    localStorage.setItem('kryptonite', token)   
     }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data]) 
  
    const handleLogin = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }
  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm