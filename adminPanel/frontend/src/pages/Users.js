import { useState } from "react";

const Users = () => {

    const [users, setUsers] = useState()
    const makeAPICall = async () => {
        try {
            const response = await fetch('http://localhost:9000/api', {mode:'cors'});
            let data = await response.json();
            data = data.users
            setUsers(data)

            /*
            data.forEach(e => {
                users.push(e)
            });
            */
        }
        catch (e) {
            console.log(e)
        }
      }

      makeAPICall()

      console.log(users)
      //console.log(users)
      /*
      useEffect(() => {
        makeAPICall();
      }, [])
      */



    return(
        <div className="Users">
            <div>
                {users && users.userName.map((value, key) => {
                    <div>
                        <div>{value.status}</div>
                        <div>{value.count}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Users