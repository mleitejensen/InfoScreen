import { useState, useEffect } from "react";

const Users = () => {
    const [users, setUsers] = useState()
    
    useEffect(() => {
        makeAPICall()
      },[])



    const makeAPICall = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/users', {mode:'cors'});
            let data = await response.json();
            setUsers(data)
        }
        catch (e) {
            console.log(e)
        }
    }

    return(
        <div className="users">
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