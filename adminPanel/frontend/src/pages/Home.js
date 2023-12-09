import Login from "../components/login"
import Signup from "../components/signup"

const Home = () => {

    return (
      <div className="home">
        <h2>Login to administer info screen</h2>
        <div>
            <Login/>
            <Signup/>
        </div>
      </div>
    )
  }
  
  export default Home