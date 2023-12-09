import { Link } from 'react-router-dom'

const Navbar = () => {

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
        <h1>Username</h1>
      </div>
    </header>
  )
}

export default Navbar