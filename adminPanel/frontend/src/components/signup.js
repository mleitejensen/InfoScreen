import { useState } from "react"

const Signup = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [result, setResult] = useState(null)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setResult(null)
    
        const response = await fetch('http://localhost:9000/signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ username, password})
        })
        const json = await response.json()

        if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
        }
        if (response.ok) {
        setIsLoading(false)
        setResult(json.result)
        }
        
        //setTimeout(removeResult(), 2000)
    }

    return(
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <div className="formTitle">Sign up</div>
                <label>Username</label><br/>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input><br/>
                <label>Password</label><br/>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input><br/>

                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
                {result && <div className="result">{result}</div>}

            </form>
        </div>
    )
}

export default Signup