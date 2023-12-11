import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { user } = useAuthContext

  return (
    <header>
      <div className="container">
        <Link to="/users">
          <h1>Users</h1>
        </Link>
        <Link to="/order">
          <h1>Order</h1>
        </Link>
        <Link to="/">
          <h1>Logout</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.username}</span>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
        
      </div>
    </header>
  )
}

export default Navbar