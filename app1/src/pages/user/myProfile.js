import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const [user, setUser] = useState({})
    const navigate = useNavigate()
   

    useEffect(() => {
      if(!sessionStorage['token']){
        navigate('/signin')
      } else {
        getUser(sessionStorage['id']);
      }
    
  }, []);

  const getUser = (id) =>{
    axios
            .get('http://localhost:9090/oras/user/' + id,{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response) => {
                const result = response.data
                console.log(result)
                if(result.length!==0)
                {
                    setUser(result)
                }
                else
                {
                  toast.error("User not found ...!!")
                }
            })       
  }

  const editProfile = () => {
    navigate('/editProfile')
  }

  const uploadImage = () => {
    navigate('/uploadProfile')
  }
    return (
      <div className="container" style={{ marginTop: 20 }}>
        <h1 style={{ textAlign: "center", marginBottom: 50 }}>
          My Profile Details
        </h1>
    

        <div className="row">
          <div
            className="col"
            style={{ borderRightStyle: "solid", borderRightColor: "lightgrey"}}
          >
          
            <img
              alt="User"
              class="rounded-circle"
              style={{
                height: 300,
                width: "50%",
                display: "block",
                borderRadius: 10,
                marginLeft:300,
               
                
              }}
              src={"http://localhost:9090/oras/user/image/" + user.id }
            />
          </div>
          <div className="col">
            <h2>My Details : </h2>
            <h4>
              Name : {user.firstName} {user.lastName}
            </h4>
            <h4>Email : {user.email}</h4>
            <h4>Contact No : {user.mobileNo}</h4>
            <h4>Security Question : {user.securityQuestion}</h4>
            <h4>Security Answer : {user.securityAnswer}</h4>
          </div>
        </div>

        <br></br>

    <div style={styles.h3}> <button
                    onClick={() => uploadImage()}
                    style={styles.button}
                    className='btn btn-sm btn-warning'>
                    Upload/Change Image
                  </button>
                  <button
                     onClick={() => editProfile()}
                    style={styles.button}
                    className='btn btn-sm btn-success'>
                    Update Profile
                  </button> </div>
                    
      
      </div>
    );
  }
  const styles = {
    h3: {
      textAlign: 'center',
      margin: 20,
    },
    button: {
      marginRight: 10,
      height: 50
      
    },
  }

  export default MyProfile

 