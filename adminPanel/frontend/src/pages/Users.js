import { useState, useEffect } from "react";

const Users = () => {
    const [users, setUsers] = useState()
    
    useEffect(() => {
        makeAPICall()
      },[])
      
    const makeAPICall = async () => {
        try {
            const response = await fetch('http://localhost:9000/users',);
            let data = await response.json();
            setUsers(data)
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <div className="users">
            <div className="listTitle">
                <h2>Username</h2>
                <h2>Admin</h2>
            </div>
               {users && users.map((user) => (
                    <div className="userPreview" key={user._id}>
                        <h2>{user.username}</h2>
                        <h2>{user.admin}</h2>
                    </div>
               ))}
               {!users && "Loading..."}
        </div>
    )
}

export default Users