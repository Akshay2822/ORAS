import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'


const Wishlist = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
      if(!sessionStorage['token']){
        navigate('/signin')
      } else {
        loadProperties();
      }
    
  }, []);


  const loadProperties = () => {
    axios
      .get(
        "http://localhost:9090/oras/wishlist/mywishlist/" + sessionStorage["id"],
        {
          headers: {
            Authorization: "Bearer " + sessionStorage["token"],
          },
        }
      )
      .then((response) => {
        const result = response.data;
        console.log(result);
        if (result.length!==0) {
          setListings(result);
        } else {
          toast.error("Your wishlist is empty !!!");
        }
      });
  };
 

const viewDetails = (id) => {
  navigate('/view-property',{ state : { propertyId:id }})
}

const remove =(id) =>{
    console.log(id)
    const body = {
      id,
    }
    axios
      .post("http://localhost:9090/oras/wishlist/remove/" + sessionStorage["id"],body,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage["token"],
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        if (result==='Success') {
          loadProperties();
           toast.success("Property Removed from Wishlist")
        } else {
          loadProperties();
          toast.error("Cannot Remove from Wishlist");
        }
      });
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


  return (
    <div className="container">
      <h3 style={{ textAlign: "center", margin: 20 }}>Wishlist</h3>
      {/* conditional rendering */}
      {listings.length === 0 && (
        <h4 style={{ textAlign: "center", margin: 20 }}>
          Your wishlist is empty. Please add some properties from the home page.
        </h4>
      )}

      {/* {renderWishlistMessage()} */}
      <div style={{}} className="row">
        {listings.map((listing) => {
          const imageUrl =
            "http://localhost:9090/oras/property/image/" + listing.id;
          console.log(imageUrl);
          return (
            <div
              className="col-3"
              style={{
                position: "relative",
                padding: 20,
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              <img 
                alt="home"
                style={{
                  height: 250,
                  width: "100%",
                  display: "block",
                  borderRadius: 10,
                }}
                src={imageUrl}
                onClick={() => viewDetails(listing.id)}
              />
              <div style={{ marginTop: 20 }}>
                <h5 className="card-title">Status : {listing.status}</h5>
                <p>Rent : Rs. {listing.rentAmount} /Month
                </p>
              </div>
              
              <button
                     onClick={() => remove(listing.id)}
                    style={styles.button}
                    className='btn btn-sm btn-danger'>
                    Remove from wishlilst
                  </button>
                  <button
                     onClick={() => book(listing.id)}
                    style={styles.button}
                    className='btn btn-sm btn-primary'>
                   Book
                  </button>
            </div>
          );
        })}
      </div>
    </div>
  );

};

const styles = {
    h3: {
      textAlign: 'center',
      margin: 20,
    },
    button: {
      marginRight: 10,
    },
  }

export default Wishlist;
