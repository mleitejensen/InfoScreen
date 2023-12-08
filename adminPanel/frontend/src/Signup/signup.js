import "./signup.css"

function Signup(){
    return(
        <div className="signup">
            <form>
                <div className="formTitle">Sign up</div>
                <label>Username</label><br/>
                <input type="text"></input><br/>
                <label>Password</label><br/>
                <input type="password"></input><br/>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Signup