import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const GetAllProperty=()=>{
    const [properties,setProperties] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if(!sessionStorage['token']){
            navigate('/signin')
        } else {
            getAllProperty()
        }
    },[])

    const getAllProperty = ()=>{
        axios
            .get('http://localhost:9090/oras/property/all',{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.length!==0)
                {
                    setProperties(result)
                }
                else
                {
                    toast.error("No Property found ....!!")
                }
            })
    }

    const deleteProperty = (id) => {
        axios
            .delete('http://localhost:9090/oras/property/'+ id,{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.length!==0)
                {
                    getAllProperty()
                    toast.success("Property Deleted Successfully ....!!!")
                }
                else
                {
                    getAllProperty()
                    toast.error("Property Deletion failed ....!!!")
                }
            })
      }

    return(
        
        <div className='container'>
            <h3 style={styles.h3}>All Properties</h3>

            {/* conditional rendering */}
            {properties.length === 0 && (
              <h4 style={{ textAlign: "center", margin: 20 }}>
                No Property found.</h4>
            )}

            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Property Id</th>
                    <th>Area</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Owner Name</th>
                    <th>Owner Id</th>

                </tr>
                </thead>
                <tbody>
                {properties.map((property) => {
                    return (
                    <tr>
                        <td>{property.id}</td>
                        <td>{property.area}</td>
                        <td>{property.city}</td>
                        <td>{property.state}</td>
                        <td>{property.customer.firstName} {property.customer.lastName}</td>
                        <td>{property.customer.id}</td>
                        <td>
                        <button
                            onClick={() => deleteProperty(property.id)}
                            style={styles.button}
                            className='btn btn-sm btn-danger'>
                            Delete
                        </button>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
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

export default GetAllProperty