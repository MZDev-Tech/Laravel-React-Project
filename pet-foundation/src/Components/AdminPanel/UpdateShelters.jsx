import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; 
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdateShelters = ({ currentId, setUpdateModal, refreshShelters }) => {
  const [updateData, setUpdateData] = useState({
    name: '',
    location: '',
    detail: '',
    link: '',
    image: '', 
  });
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); 

     //handle validation errors
     const[errors,handleErrors]=useState({});
  
     const validateForm=()=>{
       const newErrors={};
       if(!updateData.name){
       newErrors.name="Category filed is required";
       }else if(updateData.name.length > 255){
         newErrors.name = 'Name must not exceed 255 characters';
       }
       if(!updateData.location){
         newErrors.location="Category filed is required";
         }else if(updateData.location.length > 255){
           newErrors.location = 'Name must not exceed 255 characters';
         }
       if(!updateData.detail){
         newErrors.detail="Category detail is required";
       }
       if (fileImage) {
        if (fileImage.size > 5 * 1024 * 1024) {
          newErrors.image = "Image must be less than 5MB.";
        } else if (!['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(fileImage.type)) {
          newErrors.image = "Only JPG, PNG, and GIF formats are allowed.";
        }
      }
  
       if(!updateData.link){
        newErrors.link="Category detail is required";
      }
     
       handleErrors(newErrors);
       return Object.keys(newErrors).length===0;
     };
  
  // Fetch existing Shelter data when component mounts or currentId changes
  useEffect(() => {
    const fetchShelterData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/ShelterById/${currentId}`);
        setUpdateData(response.data);
        setPreviewImage(`http://127.0.0.1:8000/storage/${response.data.image}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentId) {
      fetchShelterData();
    }
  }, [currentId]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUpdateData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
  };

  const uploadShelter = async () => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', updateData.name);
    formData.append('location', updateData.location);
    formData.append('detail', updateData.detail);
    formData.append('link', updateData.link);

    if (fileImage) {
      formData.append('image', fileImage);
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/updateShelter/${currentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      refreshShelters();
      toast.success('Shelter updated successfully.');
      setUpdateModal(false); 
    } catch (error) {
      console.error('Error updating Shelter:', error);
      toast.error('Something went wrong while updating the Shelter.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()){
      return;
    }
    await uploadShelter();
  };


  return (
    <div className={`popup-largerModel ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Animal Shelters</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
          <label>Shelter</label>

            <div className="fieldAdd">
              <input
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleInput}
                placeholder="Animal Shelters"
                required
              />
        {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}

            </div>

            <div className="fieldAdd">
            <label>Location</label>

              <input
                type="text"
                name="location"
                value={updateData.location}
                onChange={handleInput}
                placeholder="Location"
                required
              />
              {errors.location && <div style={{ color: 'red', fontSize: '12px' }}>{errors.location}</div>}
            </div>

            <div className="fieldAdd">
            <label>Description</label>

              <textarea
                name="detail"
                value={updateData.detail}
                onChange={handleInput}
                placeholder="Description"
                rows="3"
                required
              />
              {errors.detail && <div style={{ color: 'red', fontSize: '12px' }}>{errors.detail}</div>}
            </div>

            <div className="fieldAdd">
              <input
                type="text"
                name="link"
                value={updateData.link}
                onChange={handleInput}
                placeholder="Shelter Site Link"
                required
              />
              {errors.link && <div style={{ color: 'red', fontSize: '12px' }}>{errors.link}</div>}
            </div>

            <div className="fieldAdd">
              <img
                src={previewImage || 'default-image-url'} // Show preview image or default
                alt="Current shelter"
                width="80"
                height="80"
              />
            </div>
            <div className="img-field">
              <label>Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              {errors.image && <div style={{ color: 'red', fontSize: '12px' }}>{errors.image}</div>}
            </div>
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateShelters
