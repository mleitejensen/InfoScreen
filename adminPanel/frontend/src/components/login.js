import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
  }

  return (
    <div className="login">
        <form onSubmit={handleSubmit}>
        <div className="formTitle">Log In</div>
        
        <label>Username</label><br/>
        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/><br/>
        <label>Password:</label><br/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/><br/>

        <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
        </form>
    </div>
  )
}

export default Login