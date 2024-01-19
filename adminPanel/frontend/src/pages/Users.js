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

    const deleteUser = async (id) => {
        try{
            const response = await fetch('http://localhost:9000/users/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({id})
            })
            console.log(response)
            makeAPICall()
        }catch(error){
            console.log(error)
        }
    }

    const updateUser = async (id) => {
        try{
            const response = await fetch('http://localhost:9000/users/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({id})
            })
            console.log(response)
            makeAPICall()
        }catch(error){
            console.log(error)
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
                        <button className="userDelete" onClick={() => {
                            deleteUser(user._id)
                        }}
                        >Delete</button>
                        {user.admin === "no" && 
                            <button className="userDelete" onClick={() => {
                                updateUser(user._id)
                            }}>Make User Admin</button>
                        }
                        {user.admin === "yes" && 
                            <button className="userDelete" onClick={() => {
                                updateUser(user._id)
                            }}>Remove Admin</button>
                        }
                            
                    </div>
               ))}
               {!users && "Loading..."}
        </div>
    )
}

export default Users