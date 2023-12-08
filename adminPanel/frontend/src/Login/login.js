import "./login.css"

function Login(){
    return(
        <div className="login">
            <form>
                <div className="formTitle">Login</div>
                <label>Username</label><br/>
                <input type="text"></input><br/>
                <label>Password</label><br/>
                <input type="password"></input><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login