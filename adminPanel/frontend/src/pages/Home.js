import Login from "../components/login"
import Signup from "../components/signup"

const Home = () => {

    return (
      <div className="home">
        <h2>Login to administer info screen</h2>
        <div>
            <p>After signing up, ask an admin to give you access.</p>
            <Login/>
            <Signup/>
        </div>
      </div>
    )
  }
  
  export default Home