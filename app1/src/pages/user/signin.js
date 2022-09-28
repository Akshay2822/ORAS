import { Link , useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from 'react';
import {toast} from 'react-toastify'

import { useDispatch } from 'react-redux'
import { signin } from '../../slices/authSlice'


const Signin =()=> {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signinUser = ()=>{

    if (email.length === 0) {
      toast.error('please enter email')
    }else if (password.length === 0) {
      toast.error('please Enter Password')
    }else{
      axios
      .post('http://localhost:9090/oras/user/login',{
        email,
        password
      })
      .then((response)=>
      {
        const result = response.data
        const user = result
        console.log(result)
        if(result.length===0)
        {
          toast.error('Invalid Email or password')
        }
        else
        {
          console.log(user)
          sessionStorage['token'] = user['jwt']
          sessionStorage['id'] = user['id']
          sessionStorage['role'] = user['role']
          dispatch(signin(user))
          toast.success('Welcome to ORAS')
          if(user['role']==='ROLE_ADMIN')
          {
              navigate('/admin-home')
          }
          else
          {
             navigate('/')
          }
         
        }
     }).catch((error)=>{
       console.log('Error')
       toast.error('Invalid Email or password')
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
            <label>Password</label>
            <input onChange={(event)=>{
            setPassword(event.target.value)
          }} className='form-control'
              type='password'
            />
          </div>

          <div className='mb-3' style={{ marginTop: 40 }}>
          <div style={{textAlign:"center",color:"blue"}}>
          <Link to='/forgotPassword'>Forgotten password?</Link></div>
          <hr/>
            <div>
              Dont have an account? <Link to='/signup'>Signup here</Link>
            </div>
            <button onClick={signinUser} style={styles.signinButton}>
              Signin
            </button>
          </div>
        </div>
      </div> 
    )
}

const styles = {
    container: {
      width: 400,
      height: 350,
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

export default Signin