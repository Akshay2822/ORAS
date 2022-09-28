import { useState,useEffect } from 'react'
import Button from '../../components/button'
import Input from '../../components/input'
import TextArea from '../../components/textArea'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HostProperty = () => {

    const [rentAmount, setRentAmount] = useState(0)
    const [status, setStatus] = useState('AVAILABLE')
    const [id,setId] = useState(sessionStorage['id'])

    const [addressLine1, setAddressLine1] = useState('')
    const [area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pinCode, setPincode] = useState('')

    const [parking, setParking] = useState('')
    const [noOfBedrooms, setNoOfBedrooms] = useState('')
    const [elevator, setElevator] = useState('')
    const [description, setDescription] = useState('')
    const [furnish, setFurnish] = useState('')

    
    const navigate = useNavigate()

    useEffect(()=>{
      if(!sessionStorage['token']){
          navigate('/signin')
      } else {
        host()
      }
  },[])

    const host = () => {
         if(addressLine1.length === 0) {
        toast.error('enter addressLine1 ')
      } else if(area.length === 0) {
        toast.error('enter area ')
      }  else if(city.length === 0) {
        toast.error('enter city ')
      }  else if(state.length === 0) {
        toast.error('enter state ')
      }  else if(pinCode.length === 0) {
        toast.error('enter pincode ')
      }  else if(parking.length === 0) {
        toast.error('choose parking ')
      }  else if(noOfBedrooms.length === 0) {
        toast.error('enter  noOfBedRooms')
      } else if(elevator.length === 0) {
        toast.error('choose elevator')
      } else if(description.length === 0) {
        toast.error('enter description')
      } else if(furnish.length === 0) {
        toast.error('enter furniture type')
      } 
      else {

        const customer = {
            id,
        }

        const body = {
            rentAmount,
            status,
            addressLine1,
            area,
            city,
            state,
            pinCode,
            parking,
            elevator,
            noOfBedrooms,
            description,
            furnish,
            customer,
        }
        console.log(body)

        axios
        .post('http://localhost:9090/oras/property', body,
        {
          headers: {
          'Authorization': 'Bearer '+ sessionStorage['token']
                   },
        }
        )
        .then((response) => {
          const result = response.data
          if (result.length!==0) {
            toast.success('successfully added new property')
            navigate('/')
          } else {
            toast.error("property registration failed !!!!")
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className="container" style={{ marginTop: 20 }}>
      <h3 style={{ textAlign: "center", marginBottom: 50 }}>Host Property</h3>

      <div className="row">
        <div
          className="col"
          style={{ borderRightStyle: "solid", borderRightColor: "lightgray" }}
        >

          <Input
            title="Address Line 1"
            onChange={(e) => {
              setAddressLine1(e.target.value);
            }}
          />
          <Input
            title="Area"
            onChange={(e) => {
              setArea(e.target.value);
            }}
          />

          <Input
            title="City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />

          <label>State</label>
          <select
            title="State"
            onChange={(e) => {
              setState(e.target.value);
            }}
            name="state"
            class="form-control"
            data-val="true"
          >
            <option value="">--Select State--</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadar and Nagar Haveli">
              Dadar and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
<br></br>
          <Input
            title="Pincode"
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          />

          <Input
            type="number"
            title="Rent Amount"
            onChange={(e) => {
              setRentAmount(e.target.value);
            }}
          />


          <input onChange={(event)=>{
            setStatus(event.target.value)
          }} className='form-control'  type='hidden' value='AVAILABLE' disabled />


        </div>
        <div className="col">
          <label>Furnish Type</label>
          <select
            title="Furnish Type"
            onChange={(e) => {
              setFurnish(e.target.value);
            }}
            class="form-control"
            data-val="true"
          >
            <option value="">--Select Furnish Type --</option>
            <option value="SEMI">SEMI</option>
            <option value="FULLY">FULLY</option>
            <option value="NONE">NONE</option>
          </select>
<br></br>
          <TextArea
            lines="4"
            title="desription"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <Input
            type="number"
            title="No of bedrooms"
            onChange={(e) => {
              setNoOfBedrooms(e.target.value);
            }}
          />

          <label>Parking</label>
          <select
            type="text"
            title="Parking"
            onChange={(e) => {
              setParking(e.target.value);
            }}
            class="form-control"
            data-val="true"
          >
            <option value="">--Select Option --</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          <br></br>

         
          <input onChange={(event)=>{
            setId(event.target.value)
          }} className='form-control'  type='hidden'  disabled />


          <label>Elevator</label>
          <select
            title="Elevator"
            onChange={(e) => {
              setElevator(e.target.value);
            }}
            class="form-control"
            data-val="true"
          >
            <option value="">--Select Option --</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>
      </div>

      <hr />

      <div className="row">
        <div
          className="col"
          style={{ borderRightStyle: "solid", borderRightColor: "lightgray" }}
        >
    

        </div>
      
      </div>

     

      <div className="row">
        <div className="col">
          <Button onClick={host} title="Host"/>
        </div>
      </div>
    </div>
  );
        
}

export default HostProperty