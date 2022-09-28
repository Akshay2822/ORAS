import {useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from 'react';
import {toast} from 'react-toastify'




const ForgotPassword = ()=> {

  const [email,setEmail]=useState('')
  const [securityQuestion,setSecurityQuestion]=useState('')
  const [securityAnswer,setSecurityAnswer]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')


 
  const navigate = useNavigate()

  const forgotPassword = ()=>{

    if (email.length === 0) {
      toast.error('please enter email')
    } else if (securityQuestion.length === 0) {
        toast.error('please choose Security Question')
      } else if (securityAnswer.length === 0) {
        toast.error('please Enter Security Answer')
      } else if (password.length === 0) {
      toast.error('please Enter Password')
    } else if (confirmPassword.length === 0) {
        toast.error('please Enter Confirm Password')
      }else if (password !== confirmPassword) {
        toast.error('password does not match')
      }
    else{
      axios
      .post('http://localhost:9090/oras/user/forgotpassword',{
        email,
        securityQuestion,
        securityAnswer,
        password
      })
      .then((response)=>
      {
        const result = response.data
        if(result.length===0)
        {
            toast.error('Invalid credential')
        }
        else
        {
            toast.success('Successfully Reset Password')
            navigate('/signin')
        }
     }).catch((error)=>{
       console.log('Error')
       console.log(error)
     })   
    }
  }

    return (
        <div style={{ marginTop: 100 }}>
        <div style={styles.container}>
          <div className='mb-3'>
            <label>Email</label>
            <input onChange={(event)=>{
            setEmail(event.target.value)
          }} className='form-control'
              type='email'
            />
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
            <label>New Password</label>
            <input onChange={(event)=>{
            setPassword(event.target.value)
          }} className='form-control'
              type='password'
            />
          </div>

          
        <div className='mb-3'>
          <label>Confirm New Password</label>
          <input onChange={(event)=>{
            setConfirmPassword(event.target.value)
          }} className='form-control' type='password' />
        </div>

          <div className='mb-3' style={{ marginTop: 40 }}>
                     <button onClick={forgotPassword} style={styles.forgotPassword}>
                     Submit
            </button>
          </div>
        </div>
      </div> 
    )
}

const styles = {
    container: {
      width: 400,
      height: 500,
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
    forgotPassword: {
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

export default ForgotPassword