import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyProperties = () => {
    const [properties, setProperties] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(!sessionStorage['token']){
            navigate('/signin')
        } else {
            getMyProperties()
        }
    }, [])

    const getMyProperties = () =>{
        axios.get('http://localhost:9090/oras/property/myproperty/'+sessionStorage['id'], 
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
                toast.error("You have not hosted any property !!!!")
              }
        })
    }

    const uploadImage = (id) => {
        navigate('/upload-image', { state: { propertyId: id } })
      }
    
    const deleteProperty = (id)=>{
      axios
      .delete('http://localhost:9090/oras/property/'+id,
      {
        headers: {
        'Authorization': 'Bearer '+ sessionStorage['token']
                 },
      })
      .then((response) => {
        const result = response.data
        if(result.length!==0)
        {
          getMyProperties()
          toast.success('Property Deleted Successfully')
        }
        else
        {
           toast.error("Property Cannot be Deleted")
        }
      })
    }

    const editProperty = (id) => {
      navigate('/edit-property',{ state : { propertyId:id }})
    }

    const viewDetails = (id) => {
      navigate('/view-property-only',{ state : { propertyId:id }})
    }
    
        return (
          <div className="container">
            <h3 style={{ textAlign: "center", margin: 20 }}>My Properties</h3>
            {/* conditional rendering */}
            {properties.length === 0 && (
              <h4 style={{ textAlign: "center", margin: 20 }}>
                Your have not hosted any property.</h4>
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
                    onClick={() => uploadImage(property.id)}
                    style={styles.button}
                    className='btn btn-sm btn-warning'>
                    Upload Image
                  </button>
                  <button
                    onClick={() => editProperty(property.id)}
                    style={styles.button}
                    className='btn btn-sm btn-success'>
                    Edit
                  </button>
                  <button
                     onClick={() => deleteProperty(property.id)}
                    style={styles.button}
                    className='btn btn-sm btn-danger'>
                    Delete
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
  export default MyProperties