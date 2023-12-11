const Login = () => {



    return(
        <div className="login">
            <form>
                <div className="formTitle">Login</div>
                <label>Username</label><br/>
                <input type="text" name="username" required></input><br/>
                <label>Password</label><br/>
                <input type="password" name="password" required></input><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login