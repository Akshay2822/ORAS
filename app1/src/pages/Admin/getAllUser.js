import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const GetAllUser=()=>{
    const [users,setUsers] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        if(!sessionStorage['token']){
            navigate('/signin')
        } else {
            getAllUser()
        }
    },[])

    const getAllUser = ()=>{
        axios
            .get('http://localhost:9090/oras/user/allUsers',{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.length!==0)
                {
                    setUsers(result)
                }
                else
                {
                    toast.error("No users found ....!!")
                }
            })
    }

    const deleteUser = (id) => {
        axios
            .delete('http://localhost:9090/oras/user/'+ id,{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result==='Success')
                {
                    getAllUser()
                    toast.success("User Deleted Successfully ....!!!")
                }
                else
                {
                    getAllUser()
                    toast.error("User Deletion failed ....!!!")
                }
            })
      }

    return(
        
        <div className='container'>
            <h3 style={styles.h3}>All Users</h3>

            {/* conditional rendering */}
            {users.length === 0 && (
              <h4 style={{ textAlign: "center", margin: 20 }}>
                No user found.</h4>
            )}

            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>User Id</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    return (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.mobileNo}</td>
                        <td>
                        <button
                            onClick={() => deleteUser(user.id)}
                            style={styles.button}
                            className='btn btn-sm btn-danger'>
                            Delete
                        </button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}


const styles = {
    h3: {
      textAlign: 'center',
      margin: 20,
    },
    button: {
      marginRight: 10,
    },
  }

export default GetAllUser