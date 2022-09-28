import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

const OwnerDetails = (props) => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
    const location = useLocation()
    
    useEffect(()=>{
      if(!sessionStorage['token']){
        navigate('/signin')
      } else {
        const {propertyId} = location.state
        getUser(propertyId)
      }
    },[])

  const getUser = (id) =>{
    axios
            .get('http://localhost:9090/oras/property/owner/' + id,{
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


    return (
      <div className="container" style={{ marginTop: 20 }}>
        <h1 style={{ textAlign: "center", marginBottom: 50 }}>
        Property Owner Details 
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
            <h2>Owner Details : </h2>
            <h4>
              Name : {user.firstName} {user.lastName}
            </h4>
            <h4>Email : {user.email}</h4>
            <h4>Contact No : {user.mobileNo}</h4>
          </div>
        </div>

        <br></br>
      </div>
    );
  }
  

  export default OwnerDetails

 