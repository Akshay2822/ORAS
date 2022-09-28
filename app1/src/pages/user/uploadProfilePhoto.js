import Button from '../../components/button'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'

const UploadProfileImage = () => {
  const [file, setFile] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if(!sessionStorage['token']){
      navigate('/signin')
    } else {
      uploadImage();
    }
  
}, []);

  const uploadImage = () => {
    const body = new FormData();

    body.set("imageFile", file);

    axios
      .post(
        "http://localhost:9090/oras/user/image/" + sessionStorage["id"],
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage["token"],
          },
        }
      )
      .then((response) => {
        const result = response.data;
        if (result.length!==0) {
          toast.success("successfully uploaded Profile Photo");
          navigate("/myProfile");
        } else {
          toast.error("error while uploading file");
        }
      });
  };

  return (
    <div className="container">
      <h3 style={{ textAlign: "center", margin: 20 }}>Upload Image</h3>

      <div className="mb-3">
        <label>Select Image</label>
        <input
          onChange={(e) => {
            // set the selected file in the state
            setFile(e.target.files[0]);
          }}
          className="form-control"
          type="file"
        />
        <Button onClick={uploadImage} title="Upload Photo"></Button>
      </div>
    </div>
  );
}

export default UploadProfileImage