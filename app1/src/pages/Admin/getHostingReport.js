import axios from "axios"
import { useState,useEffect} from "react"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const GetHostingReport=()=>{

    const [fromDate,setFromDate] = useState('')
    const [toDate,setToDate] = useState('')
    const [hostings,setHostings] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        if(!sessionStorage['token']){
            navigate('/signin')
        } else {
            getHostingReport()
        }
    },[])

    const getHostingReport = ()=>{
        axios
            .get('http://localhost:9090/oras/admin/hosting/'+fromDate+'/'+toDate,{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response)=>{
                const result = response.data
                console.log(result)
                if(result.length!==0)
                {
                    setHostings(result)
                }
                else
                {
                    toast.error("No Hostings found ....!!")
                }
            })
    }

    return(
        
        <div className='container'>
            <h3 style={style.h3}>Property Hostings Report Card</h3>
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
                  <button  onClick= {getHostingReport} style={styles.signinButton}>Submit</button>
                  </div>
  
              </div>
          </div>
            <table style={{marginTop:50}} className='table table-striped'>
                <thead>
                <tr>
                    <th>Hosting Id</th>
                    <th>Property Id</th>
                    <th>Owner Id</th>
                    <th>Owner Name</th>
                    <th>Owner Contact</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {hostings.map((hosting) => {
                    return (
                    <tr>
                        <td>{hosting.id}</td>
                        <td>{hosting.property.id}</td>
                        <td>{hosting.owner.id}</td>
                        <td>{hosting.owner.firstName} {hosting.owner.lastName}</td>
                        <td>{hosting.owner.mobileNo}</td>
                        <td>{hosting.date}</td>
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

export default GetHostingReport