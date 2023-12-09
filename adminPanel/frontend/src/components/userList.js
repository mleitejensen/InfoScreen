const UserList = ({ user }) => {

    return (
      <div className="workout-details">
        <h4>{user.userName}</h4>
        <p>{user.admin}</p>
      </div>
    )
  }
  
  export default UserList