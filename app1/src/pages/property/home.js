import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import {signin} from '../../slices/authSlice'
// import ToggleHeart from '../../components/toggleHeart'
import { useNavigate } from 'react-router-dom'


const Property = ()=> {
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
      if(sessionStorage['role']==='ROLE_ADMIN')
      {
        navigate('/admin-home')
      }
      else
      {
        axios.get('http://localhost:9090/oras/property/available',{
          headers:{ token: sessionStorage['token']},
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



    const viewDetails = (id) => {
      if(sessionStorage['token'] == null)
      {
         navigate('/view-property-only',{ state : { propertyId:id }})
      }
      else{
        navigate('/view-property',{ state : { propertyId:id }})
      }
     
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
            toast.success('Payment received and Property Booked Successfully ..')
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

    return (
        <div className='container'>
      <div style={{}} className='row'>
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
    marginRight: 10,
  },
}
export default Property