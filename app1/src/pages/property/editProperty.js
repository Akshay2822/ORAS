import { useState,useEffect } from 'react'
import Button from '../../components/button'
import Input from '../../components/input'
import TextArea from '../../components/textArea'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'


const EditProperty = (props) => {

    const [details , setDetails] = useState({})
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
      if(!sessionStorage['token']){
        navigate('/signin')
    } else {
      const {propertyId} = location.state
      getDetails(propertyId)
    }
    },[])

    const getDetails = (id) => {
        axios
            .get('http://localhost:9090/oras/property/get/' + id,{
                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                         },
            })
            .then((response) => {
                const result = response.data
                console.log(result)
                if(result!=null)
                {
                    setDetails(result)
                }
                else
                {
                  toast.error("Cannot Fetch Previous Details")
                  navigate('/myProperties')
                }
            })          
    } 

    const updateProperty = () =>{
        
        console.log(details)
        axios
            .put('http://localhost:9090/oras/property/update',details,{

                headers: {
                    'Authorization': 'Bearer '+ sessionStorage['token']
                             },
            })
            .then((response) => {
                const result = response.data
                if(result!=null)
                {
                    toast.success('update Property Successfull')
                    navigate('/myProperties')
                }
                else
                {
                    toast.error('Cannot Update Details')
                    navigate('/myProperties')
                }
            })
    }

    return (
    <div className="container" style={{ marginTop: 20 }}>
      <h3 style={{ textAlign: "center", marginBottom: 50 }}>Edit Property</h3>

     
      <div className="row">
        <div
          className="col"
          style={{ borderRightStyle: "solid", borderRightColor: "lightgray" }}
        >

          <Input
            title="Address Line 1" type="text" value={details.addressLine1}
            onChange={(e) => {
              setDetails({...details, addressLine1 : e.target.value});
            }}
          />
          <Input
            title="Area" type="text" value={details.area}
            onChange={(e) => {
              setDetails({...details, area : e.target.value});
            }}
          />

          <Input
            title="City" value={details.city}
            onChange={(e) => {
              setDetails({...details, city : e.target.value});
            }}
          />

          <label>State</label>
          <select
            title="State" value={details.state}
            onChange={(e) => {
              setDetails({...details, state : e.target.value});
            }}
            name="state"
            class="form-control"
            data-val="true"
          >
            <option value="">--Select State --</option>
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
            title="Pincode" type='number' value={details.pinCode}
            onChange={(e) => {
              setDetails({...details, pinCode : e.target.value});
            }}
          />

          <Input
            type="number"
            title="Rent Amount" value={details.rentAmount}
            onChange={(e) => {
              setDetails({...details, rentAmount : e.target.value});
            }}
          />


          <input onChange={(event)=>{
            setDetails({...details, status : event.target.value});
          }} className='form-control'  type='hidden' value={details.status} disabled />


        </div>
        <div className="col">
          <label>Furnish Type</label>
          <select
            title="Furnish Type" value={details.furnish}
            onChange={(e) => {
              setDetails({...details, furnish : e.target.value});
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
            title="desription" value={details.description}
            onChange={(e) => {
              setDetails({...details, description : e.target.value});
            }}
          />

          <Input
            type="number"
            title="No of bedrooms" value={details.noOfBedrooms}
            onChange={(e) => {
              setDetails({...details, noOfBedrooms : e.target.value});
            }}
          />

          <label>Parking</label>
          <select
            type="text"
            title="Parking" value={details.parking}
            onChange={(e) => {
              setDetails({...details, parking : e.target.value});
            }}
            class="form-control"
            data-val="true"
          >
            <option value="">--Select Option</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
          <br></br>

         
          <input value={details.id}
          onChange={(e)=>{
            setDetails({...details, id : e.target.value});
          }} className='form-control'  type='hidden'  disabled />


          <label>Elevator</label>
          <select
            title="Elevator"  value={details.elevator}
            onChange={(e) => {
              setDetails({...details, elevator : e.target.value});
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
        <div className="col">
          <Button onClick={updateProperty} title="Update Details"/>
        </div>
      </div>
    </div>
  );
        
}

export default EditProperty