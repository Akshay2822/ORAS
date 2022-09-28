import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyBooking = () => {
    const [properties, setProperties] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(!sessionStorage['token']){
            navigate('/signin')
        } else {
            getMyBookings()
        }
    }, [])

    const getMyBookings = () =>{
        axios.get('http://localhost:9090/oras/property/mybooking/'+sessionStorage['id'], 
        {
            headers: {
            'Authorization': 'Bearer '+ sessionStorage['token']
                     },
          }
        )
        .then((response) => {
            const result = response.data

            if (result.length!==0) {
                
                setProperties(result)
              } else {
                toast.error("You have not Booked any property !!!!")
              }
        })
    }
    
    const viewDetails = (id) => {
      navigate('/view-property',{ state : { propertyId:id }})
    }

    const viewOwner = (pid) => {
        console.log(pid);
        navigate('/view-owner',{ state : { propertyId:pid }})
      }
    
        return (
          <div className="container">
            <h3 style={{ textAlign: "center", margin: 20 }}>My Bookings</h3>
            {/* conditional rendering */}
            {properties.length === 0 && (
              <h4 style={{ textAlign: "center", margin: 20 }}>
                Your have not Booked any property.</h4>
            )}

            <div style={{}} className="row">
              {properties.map((property) => {
                const imageUrl =
                  "http://localhost:9090/oras/property/image/" + property.id;
                return (
                  <div
                    key={property.id}
                    className="col-3"
                    style={{
                      position: "relative",
                      padding: 20,
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        position: "absolute",
                        right: 40,
                        top: 30,
                      }}
                    ></div>

                    <img
                      alt="home"
                      style={{
                        height: 250,
                        width: "100%",
                        display: "block",
                        borderRadius: 10,
                      }}
                      src={imageUrl}
                      onClick={() => viewDetails(property.id)}
                    />
                    <div style={{ marginTop: 20 }}>
                      <h5 className="card-title">Status : {property.status}</h5>
                      <p>Rent : Rs. {property.rentAmount} /Month
                </p>
                    </div>
                  <button
                     onClick={() => viewOwner(property.id)}
                    style={styles.button}
                    className='btn btn-sm btn-primary'>
                    Show Owner Details
                  </button>
                  
                  </div>
                );
              })}
            </div>
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
    },
  }
  export default MyBooking