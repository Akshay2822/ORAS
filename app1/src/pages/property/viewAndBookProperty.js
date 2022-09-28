import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import Button from '../../components/button'

const PropertyDetails = (props) => {
  const [property, setProperty] = useState({})
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
      if(!sessionStorage['token']){
        navigate('/signin')
      } else {
        const {propertyId} = location.state
      getProperty(propertyId)
      }
    },[])

  const getProperty = (id) =>{
    axios
            .get('http://localhost:9090/oras/property/get/' + id,{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response) => {
                const result = response.data
                console.log(result)
                if(result.length!==0)
                {
                    setProperty(result)
                }
                else
                {
                  toast.error("Property not found ...!!")
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
          else if(result==='Self')
          {
            toast.error("Cannot add your own property into Wishlist ...!!")
          }
          else
          {
            toast.error("This Property is Already in Your Wishlist")
          }
        })
  }
    return (
      <div className='container' style={{ marginTop: 20}}>
      <h1 style={{ textAlign: 'center', marginBottom: 50 }}>Property Details</h1>
      <hr></hr>

      <div className='row'>
        
        <div
          className='col'
          style={{ borderRightStyle: 'solid', borderRightColor: 'lightgrey' }}>
            <img
                          alt="home"
                          style={{
                            height: 450,
                            width: "100%",
                            display: "block",
                            borderRadius: 10,
                          }}
                          src={"http://localhost:9090/oras/property/image/" + property.id}
                        
                        />
        </div>
        <div className='col'>
          
          <h2>Address Details : </h2>
          <h4>{property.addressLine1}</h4>
          <h4>{property.area}</h4>
          <h4>{property.city}</h4>
          <h4>{property.state}</h4>
          <h4>{property.pinCode}</h4>
          <h4>Description : {property.description}</h4>
         
        </div>
      </div>

    <br></br>

      <div className='row'>
        <div
          className='col'
          style={{ borderRightStyle: 'solid', borderRightColor: 'lightgray' }}>
          <h2>Amenities Details :</h2>
          <h4>Parking : {property.parking}</h4>
          <h4>Bedrooms : {property.noOfBedrooms}</h4>
          <h4>Elevator : {property.elevator}</h4>
          <h4>Furnish Type : {property.furnish}</h4>
     
        </div>
        <div className='col'>
          <h2>Other Details : </h2>
          <h4>Rent : {property.rentAmount} /Month</h4>
          <h4>Availablity : {property.status}</h4>

        </div>
      </div>

      <br></br>

      <div >
        <div>
          <Button onClick={() => book(property.id)} title='Book'/>
           <Button onClick={() => addToWishlist(property.id)} title='Add To Wishlist'/>
        </div>
        
      </div>
    </div>
    )
  }
  export default PropertyDetails

 