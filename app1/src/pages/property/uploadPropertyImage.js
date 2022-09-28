import Button from '../../components/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'

const UploadImage = () => {
    const [propertyId, setPropertyId] = useState()

    const [file, setFile] = useState()

    const location = useLocation()

    const navigate = useNavigate()

    useEffect(() => {
      if(!sessionStorage['token']){
        navigate('/signin')
      } else {
        const { propertyId } = location.state
        setPropertyId(propertyId)
      }
    }, [])

      const uploadImage = () => {
        const body = new FormData()

        body.set('imageFile', file)

        axios
            .post('http://localhost:9090/oras/property/image/'+propertyId,body,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ sessionStorage['token']
                         },
              })
            .then((response) =>{
                const result = response.data
                if (result.length!==0) {
                    toast.success('successfully uploaded a file')
                    navigate('/myProperties')
                  } else {
                    toast.error("error while uploading file")
                  }
            })
}

return (
    <div className='container'>
      <h3 style={{ textAlign: 'center', margin: 20 }}>Upload Image</h3>

      <div className='mb-3'>
        <label>Select Image</label>
        <input
          onChange={(e) => {
            // set the selected file in the state
            setFile(e.target.files[0])
          }}
          className='form-control'
          type='file'
        />
        <Button onClick={uploadImage} title='Upload Photo'></Button>
      </div>
    </div>
  )

}

export default UploadImage