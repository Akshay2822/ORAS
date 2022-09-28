import axios from "axios"
import { useState,useEffect} from "react"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const GetBookingReport=()=>{

    const [fromDate,setFromDate] = useState('')
    const [toDate,setToDate] = useState('')
    const [bookings,setBookings] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        if(!sessionStorage['token']){
            navigate('/signin')
        } else {
            getBokingReport()
        }
    },[])

    const getBokingReport = ()=>{
        axios
            .get('http://localhost:9090/oras/admin/booking/'+fromDate+'/'+toDate,{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.length!==0)
                {
                    setBookings(result)
                }
                else
                {
                    toast.error("No Bookings found ....!!")
                }
            })
    }

    return(
        
        <div className='container'>
            <h3 style={style.h3}>Property Bookings Report Card</h3>
            <div style = {{marginTop:50}}>
            <h5 style={style.h3}>Please mention dates to get report</h5>
              <div style = {styles.container}>
                  <div class="mb-3">
                      <label >Enter From Date</label>
                      <input 
                          onChange={(event)=>{setFromDate(event.target.value)}}
                          type="date" class="form-control"/>
                  </div>
  
                  <div class="mb-3">
                      <label >Enter To Date</label>
                      <input 
                          onChange={(event)=>{setToDate(event.target.value)}}
                          type="date" class="form-control" />
                  </div>
  
                  <div class="mb-3">
                  <button  onClick= {getBokingReport} style={styles.signinButton}>Submit</button>
                  </div>
  
              </div>
          </div>
            <table style={{marginTop:50}} className='table table-striped'>
                <thead>
                <tr>
                    <th>Booking Id</th>
                    <th>Property Id</th>
                    <th>Owner Name</th>
                    <th>Owner Contact</th>
                    <th>Customer Id</th>
                    <th>Customer Name</th>
                    <th>Customer Contact</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => {
                    return (
                    <tr>
                        <td>{booking.id}</td>
                        <td>{booking.property.id}</td>
                        <td>{booking.property.customer.firstName} {booking.property.customer.lastName}</td>
                        <td>{booking.property.customer.mobileNo}</td>
                        <td>{booking.customer.id}</td>
                        <td>{booking.customer.firstName} {booking.customer.lastName}</td>
                        <td>{booking.customer.mobileNo}</td>
                        <td>{booking.date}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}


const style = {
    h3: {
      textAlign: 'center',
      margin: 20,
    },
    button: {
      marginRight: 10,
    },
  }

  const styles = {
    container:{
        width:400,
        height:250,
        padding:20,
        position:'relative',
        margin: 'auto',
        borderColor: '#6044E7',
        borderRadius: 10,
        broderWidth: 1,
        borderStyle: 'solid',
        boxShadow: '1px 1px 20px 5px #C9C9C9',
    },
    signinButton:{
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

export default GetBookingReport