import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import {useLocation } from 'react-router-dom'

const ViewPropertyOnly = (props) => {
  const [property, setProperty] = useState({})
    const location = useLocation()

    useEffect(()=>{
      const {propertyId} = location.state

      getProperty(propertyId)
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

    return (
      <div className='container' style={{ marginTop: 20 }}>
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
    </div>
    )
  }
  

  export default ViewPropertyOnly

 