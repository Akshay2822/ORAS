import { Link, useNavigate } from 'react-router-dom'
import axios  from 'axios';
import { useState } from 'react';
import {toast} from 'react-toastify'





const Signup = () => 
{
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [mobileNo,setMobileNo]=useState('')
  const [securityQuestion,setSecurityQuestion]=useState('')
  const [securityAnswer,setSecurityAnswer]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [roles,setRoles]=useState(['ROLE_CUSTOMER'])

  const navigate=useNavigate();
  const signup = () => {
    if (firstName.length === 0) {
      toast.error('please enter first name')
    } else if (lastName.length === 0) {
      toast.error('please enter last name')
    } else if (email.length === 0) {
      toast.error('please enter email')
    } else if (mobileNo.length === 0) {
      toast.error('please enter Mobile number')
    } else if (roles.length === 0) {
      toast.error('please enter Role')
    } else if (securityQuestion.length === 0) {
      toast.error('please choose Security Question')
    } else if (securityAnswer.length === 0) {
      toast.error('please Enter Security Answer')
    } else if (password.length === 0) {
      toast.error('please Enter Password')
    }else if (confirmPassword.length === 0) {
      toast.error('please Enter Confirm Password')
    }else if (password !== confirmPassword) {
      toast.error('password does not match')
    }  else {
      // make the API call to check if user exists
      axios
        .post('http://localhost:9090/oras/user/signup',{
          firstName,
          lastName,
          email,
          mobileNo,
          roles,
          securityQuestion,
          securityAnswer,
          password
      }).then((response)=>{
         const result = response.data
         if(result.length===0)
         {
             toast.error('User Registration failed ...!!')
         }
         else
         {
            toast.success('Successfully Registered New User')
            navigate('/signin')
         }
      }).catch((error)=>{
        console.log('Error')
        console.log(error)
      })
  }
}
  return (
    <div style={{ marginTop: 50 }}>
      <div style={styles.container}>
        <div className='mb-3'>
          <label>First Name</label>
          <input onChange={(event)=>{
            setFirstName(event.target.value)
          }} className='form-control' type='text' />
        </div>

        <div className='mb-3'>
          <label>Last Name</label>
          <input onChange={(event)=>{
            setLastName(event.target.value)
          }} className='form-control' type='text' />
        </div>

        <div className='mb-3'>
          <label>Email</label>
          <input onChange={(event)=>{
            setEmail(event.target.value)
          }} className='form-control' type='email' />
        </div>

        <div className='mb-3'>
          <label>Mobile Number</label>
          <input onChange={(event)=>{
            setMobileNo(event.target.value)
          }} className='form-control' type='tel' />
        </div>

        <div className='mb-3'>
          {/* <label>Roles</label> */}
          <input onChange={(event)=>{
            setRoles(event.target.value)
          }} className='form-control'  type='hidden' value='ROLE_CUSTOMER' disabled />
        </div>
        
        <div className='mb-3'>
            <label>Security Question</label>
            <select 
            onChange={(event)=>{
              setSecurityQuestion(event.target.value)
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
          <input onChange={(event)=>{
            setSecurityAnswer(event.target.value)
          }} className='form-control' type='text' />
        </div>

        <div className='mb-3'>
          <label>Password</label>
          <input onChange={(event)=>{
            setPassword(event.target.value)
          }} className='form-control' type='password' />
        </div>

        <div className='mb-3'>
          <label>Confirm Password</label>
          <input onChange={(event)=>{
            setConfirmPassword(event.target.value)
          }} className='form-control' type='password' />
        </div>

        <div className='mb-3' style={{ marginTop: 40 }}>
          <div>
            Already have an account? <Link to='/signin'>Signin here</Link>
          </div>
          <button onClick={signup} style={styles.signinButton}>Signup</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: 400,
    height: 780,
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
  signinButton: {
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

export default Signup
