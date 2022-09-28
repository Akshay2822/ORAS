import {  useNavigate } from 'react-router-dom'
import axios  from 'axios';
import { useState,useEffect } from 'react';
import {toast} from 'react-toastify'

const EditProfile = () => 
{

const [details , setDetails] = useState({})

  const navigate=useNavigate();

  useEffect(() => {
    if(!sessionStorage['token']){
      navigate('/signin')
    } else {
      getDetails();
    }
  
}, []);
const getDetails = () => {
    axios
        .get('http://localhost:9090/oras/user/' + sessionStorage['id'],{
            headers: {
                'Authorization': 'Bearer '+ sessionStorage['token']
                     },
        })
        .then((response) => {
            const result = response.data
            if(result.length!==0)
            {
                setDetails(result)
            }
            else
            {
              toast.error("Cannot Fetch Previous Details")
              navigate('/')
            }
        })          
} 

  
  const editProfile = () => {
     
      console.log(details)
      axios
        .put('http://localhost:9090/oras/user',details,
        {
            headers: {
                'Authorization': 'Bearer '+ sessionStorage['token']
                     },
        })
        .then((response)=>{
         const result = response.data
         if(result.length!==0)
         {
            toast.success('Successfully Updated User Details')
            navigate('/myProfile')
         }
         else
         {  
            toast.error('Profile Updation failed ...!!')
            navigate('/myProfile')
          
         }
      })
 
}
  return (
    <div style={{ marginTop: 50}}>
      <div style={styles.container}>
        <div className='mb-3'>
          <label>First Name</label>
          <input value={details.firstName}
          onChange={(e)=>{
            setDetails({...details, firstName : e.target.value});
          }} className='form-control' type='text' required />
        </div>

        <div className='mb-3'>
          <label>Last Name</label>
          <input value={details.lastName}
          onChange={(e)=>{
            setDetails({...details, lastName : e.target.value});
          }} className='form-control' type='text' />
        </div>

        <div className='mb-3'>
          <label>Email</label>
          <input value={details.email}
          onChange={(e)=>{
            setDetails({...details, email : e.target.value});
          }} className='form-control' type='email' />
        </div>

        <div className='mb-3'>
          <label>Mobile Number</label>
          <input value={details.mobileNo}
          onChange={(e)=>{
            setDetails({...details, mobileNo : e.target.value});
          }} className='form-control' type='tel' />
        </div>

                
        <div className='mb-3'>
            <label>Security Question</label>
            <select value={details.securityQuestion}
            onChange={(e)=>{
                setDetails({...details, securityQuestion : e.target.value});
            }}
             class="form-control" data-val="true">

            <option value="">--Select Your Option--</option>
            <option value="What is your pet name?">What is your pet name?</option>
            <option value="Who is your favourite teacher?">Who is your favourite teacher?</option>
            <option value="what is your favourite dish?">what is your favourite dish?</option>
            <option value="what is your favourite sport?">what is your favourite sport?</option>
            </select>
        </div>

        <div className='mb-3'>
          <label>Security Answer</label>
          <input value={details.securityAnswer}
          onChange={(e)=>{
            setDetails({...details, securityAnswer : e.target.value});
          }} className='form-control' type='text' />
        </div>

        {/* <div className='mb-3'>
          <label>Password</label>
          <input value={details.password}
          onChange={(e)=>{
            setDetails({...details, password : e.target.value});
          }} className='form-control' type='password' />
        </div>

        <div className='mb-3'>
          <label>Confirm Password</label>
          <input 
          onChange={(e)=>{
            setConfirmPassword(e.target.value);
          }} className='form-control' type='password' />
        </div> */}

        <div className='mb-3' style={{ marginTop: 40 }}>
             <button onClick={editProfile} style={styles.EditButton}>Update Profile</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: 400,
    height: 620,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    borderColor: '#6044E7',
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
  },
  EditButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#6044E7',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
  },
}

export default EditProfile
