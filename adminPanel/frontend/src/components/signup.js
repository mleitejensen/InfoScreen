import { useState } from "react"

const Signup = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
    

        const response = await fetch('http://localhost:9000/api/create',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ username, password, admin: "no" })
        })
        const json = await response.json()

        if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
        }
        if (response.ok) {
        // update loading state
        setIsLoading(false)
        }
    }

    return(
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <div className="formTitle">Sign up</div>
                <label>Username</label><br/>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required></input><br/>
                <label>Password</label><br/>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required></input><br/>

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup