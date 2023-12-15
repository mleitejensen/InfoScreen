import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

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
          <h1>Loigin / Signup</h1>
        </Link>
        <nav>
        {user && (
            <div>
              <span>{user.username}  </span>
              <Link to="/"><button onClick={handleClick}>Log out</button></Link>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/">Login or Signup</Link>
            </div>
          )}
        </nav>
        
      </div>
    </header>
  )
}

export default Navbar