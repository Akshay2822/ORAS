import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import {signin} from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'


const AdminHome = ()=> {
    const [listings, setListings] = useState([])

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const signinStatus=useSelector((state)=>state.authSlice.status)
    useEffect(()=>{
        if(sessionStorage['token'] && sessionStorage['token'].length>0)
        {
            const user = {
                token: sessionStorage['token'],
                name: sessionStorage['username']
            }
            dispatch(signin(user));
        }
        loadProperties()
    },[])

    const loadProperties = ()=>{
      
        axios.get('http://localhost:9090/oras/property/all',{
            headers: {
            'Authorization': 'Bearer '+ sessionStorage['token']
                     },
          }).then((response)=>{
            const result = response.data  
            console.log(result)
            if(result.length!==0)
            {
                setListings(result)
            } 
             else
             {
                  toast.error("NO Properties Available")
            }
        })

    } 

    const addToWishlist = (id) =>{
      const property = {
        id,
      }
      axios
          .post('http://localhost:9090/oras/wishlist/' + sessionStorage['id'],property,{
            headers: {
              'Authorization': 'Bearer '+ sessionStorage['token']
                   },
          })
          .then((response) =>{
            const result = response.data
            console.log(result)
            if(result==='Success')
            {
              toast.success("property added into wishlist")
            }
            else
            {
              toast.error("This Property is Already in Your Wishlist")
            }
          })
    }

    const book = (pid) => {
      const id = sessionStorage['id']
      const user ={
        id,
      }
      axios
      .put('http://localhost:9090/oras/property/book/' + pid,user,{
        headers: {
        'Authorization': 'Bearer '+ sessionStorage['token']
                 },
      })
      .then((response) => {
          const result = response.data
          console.log(result)
          
          if(result==='Success')
          {
              toast.success('Property Booked Successfully ..')
              viewOwner(pid)
          }
          else if(result==='Self')
          {
            toast.error("Cannot book your own property ...!!")
          }
          else
          {
            toast.error("Property Already Booked ...!!")
          }
      }).catch((error) => {
        console.log(error)
        toast.error("You have to Login First ...!!!")
      })
    }

    const viewOwner = (pid) => {
      console.log(pid);
      navigate('/view-owner',{ state : { propertyId:pid }})
    }
    
    const viewDetails = (id) => {
      navigate('/view-property',{ state : { propertyId:id }})
    }

    const getAllUsers = () => {
      navigate('/getAllUser')
    }

    const getAllProperties = () => {
      navigate('/getAllProperty')
    }

    const bookingReport = () => {
      navigate('/getBookingReport')
    }

    const hostingReport = () => {
      navigate('/getHostingReport')
    }

    const getBalance = () => {
      axios
        .get('http://localhost:9090/oras/property/balance',{
          headers: {
              'Authorization': 'Bearer '+ sessionStorage['token']
                   },
      })
        .then((response)=>{
          const result=response.data
          if(result!==0.0)
          {
            toast.success("Your Revenue balance is Rs. "+result)
          }
          else
          {
            toast.error("Your Revenue balance is Rs. "+result)
          }
        })
    }

    return (
    
        <div className='container'>
        <h1 style={{ textAlign: 'center',marginTop:40}}>ADMIN HOME PAGE</h1>
        <div style={{marginTop:40}}>
        <button 
            onClick={() => getAllUsers()}
            style={{marginLeft: 250}}
            className='btn btn-sm btn-primary'>
            All Users Details
        </button>

        <button 
            onClick={() => getAllProperties()}
            style={styles.button}
            className='btn btn-sm btn-primary'>
            All Property Details
        </button>

        <button 
            onClick={() => bookingReport()}
            style={styles.button}
            className='btn btn-sm btn-primary'>
            Property Booking Report
        </button>

        <button 
            onClick={() => hostingReport()}
            style={styles.button}
            className='btn btn-sm btn-primary'>
            Property Hosting Report
        </button>

        <button 
            onClick={() => getBalance()}
            style={styles.button}
            className='btn btn-sm btn-primary'>
            Revenue Balance
        </button>
        </div>
        
        
      <div style={{marginTop:40}} className='row'>
        {listings.map((listing) => {
          const imageUrl = 'http://localhost:9090/oras/property/image/' + listing.id
          return (
            <div
              key={listing.id}
              className='col-3'
              style={{
                position: 'relative',
                padding: 20,
                display: 'inline-block',
                cursor: 'pointer',
              }}>
              
              <img
                alt='home'
                style={{
                  height: 250,
                  width: '100%',
                  display: 'block',
                  borderRadius: 10,
                }}
                src={imageUrl}
                onClick={() => viewDetails(listing.id)}
              />
              <div style={{ marginTop: 20 }}>
                <h5 className='card-title'>Status : {listing.status}</h5>
                <p>Rent : Rs. {listing.rentAmount} /Month
                </p>
              </div>
              {signinStatus && (
                <div>
                  <button
                    onClick={() => addToWishlist(listing.id)}
                    style={styles.button}
                    className='btn btn-sm btn-success'>
                    Add To Wishlist
                  </button>
                  <button
                     onClick={() => book(listing.id)}
                    style={styles.button}
                    className='btn btn-sm btn-primary'>
                   Book
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
    )
}

const styles = {
  h3: {
    textAlign: 'center',
    margin: 20,
  },
  button: {
    marginLeft: 10,
  },
}
export default AdminHome