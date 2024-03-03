import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import '../nav.css';

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        {user && (
          <nav>
          <Link to="/users">
            <h1 className='navLink'>Users</h1>
          </Link>
          <Link to="/order">
            <h1 className='navLink'>Info Screen Order</h1>
          </Link>
        
              <div className='username'>
                <span>{user.username}  </span>
                <Link to="/"><button onClick={handleClick}>Log out</button></Link>
              </div>
            
          </nav>
        )}
    </header>
  )
}

export default Navbar