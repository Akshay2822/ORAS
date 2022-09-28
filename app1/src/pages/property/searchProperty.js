import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from '../../components/input'

const SearchByCity = () => {
  const [listings, setListings] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const searchByCity = () => {
    if (searchText.length === 0) {
      toast.error("please enter text");
    } else {
      axios
        .get("http://localhost:9090/oras/property/city/" + searchText, {
          headers: {
            Authorization: "Bearer " + sessionStorage["token"],
          },
        })
        .then((response) => {
            const result= response.data
            console.log(result)
            if(result.length!==0)
            {
                setListings(result)
            }
            else{
                toast.error("No Property found ...!!")
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("No Property found ...!!")
            navigate('/')
        });
    }
  };

  const viewDetails = (id) => {
    if(sessionStorage['token'] == null)
    {
       navigate('/view-property-only',{ state : { propertyId:id }})
    }
    else{
      navigate('/view-property',{ state : { propertyId:id }})
    }
   
  }

  return (
    <div className="container">
        <h3 style={{ textAlign: 'center', margin: 20 }}>Search By City</h3>
        <Input
        onChange={(e) => setSearchText(e.target.value)}
        title='Enter City'
      />
    <button title='Search' onClick={searchByCity} style={styles.signinButton}>Search</button>

<br></br>
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
            <h4>Search Result</h4>
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
          </div>
        )
      })}

    </div>
  )
}

const styles = {
    container: {
      width: 400,
      height: 300,
      padding: 20,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      marginTop: 100,
      borderColor: '#6044E7',
      borderRadius: 10,
      broderWidth: 1,
      borderStyle: 'solid',
      boxShadow: '1px 1px 20px 5px #C9C9C9',
    },
    signinButton: {
      position: 'relative',
      width: '10%',
      height: 40,
      backgroundColor: '#6044E7',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 10,
      left: 570
    },
  }

export default SearchByCity