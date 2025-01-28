import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateFeedback = ({ currentId, setUpdateModal, refreshFeedback }) => {
  const [inputs, setInputs] = useState({
    name: '',
    location: '',
    detail: '',
    image: '',
  });
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  //handle validation errors
  const[errors,handleErrors]=useState({});
  
  const validateForm=()=>{
    const newErrors={};
    if(!inputs.name){
    newErrors.name="Category filed is required";
    }else if(inputs.name.length > 255){
      newErrors.name = 'Name must not exceed 255 characters';
    }
    if(!inputs.location){
      newErrors.location="Category filed is required";
      }else if(inputs.location.length > 255){
        newErrors.location = 'Name must not exceed 255 characters';
      }
    if(!inputs.detail){
      newErrors.detail="Category detail is required";
    }
    if (fileImage) {
      if (fileImage.size > 5 * 1024 * 1024) {
        newErrors.image = "Image must be less than 5MB.";
      } else if (!['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(fileImage.type)) {
        newErrors.image = "Only JPG, PNG, and GIF formats are allowed.";
      }
    }
  
    handleErrors(newErrors);
    return Object.keys(newErrors).length===0;
  };
  
  // Fetch existing feedback data when component mounts or currentId changes
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/FeedbackById/${currentId}`);
        setInputs(response.data);
        setPreviewImage(`http://127.0.0.1:8000/storage/${response.data.image}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentId) {
      fetchFeedbackData();
    }
  }, [currentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
  };

  const uploadFeedback = async () => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', inputs.name);
    formData.append('location', inputs.location);
    formData.append('detail', inputs.detail);
    if (fileImage) {
      formData.append('image', fileImage);
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/updateFeedback/${currentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      refreshFeedback();
      toast.success('Feedback updated successfully.');
      setUpdateModal(false); 
    } catch (error) {
      console.error('Error updating feedback:', error);
      toast.error('Something went wrong while updating the feedback.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()){
      return;
    }

    await uploadFeedback();
  };

  return (
    <div className={`popup-largerModel ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
            <div className="fieldAdd">
              <label>UserName</label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="User"
                required
              />
        {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}

            </div>
            <div className="fieldAdd">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={inputs.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
              {errors.location && <div style={{ color: 'red', fontSize: '12px' }}>{errors.location}</div>}
            </div>
            <div className="fieldAdd">
              <label>Description</label>
              <textarea
                name="detail"
                value={inputs.detail}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                required
              />
              {errors.detail && <div style={{ color: 'red', fontSize: '12px' }}>{errors.detail}</div>}
            </div>


            <div className="fieldAdd">
              <img
                src={previewImage || 'default-image-url'} // Show preview image or default
                alt="Current Img"
                width="80"
                height="80"
              />
            </div>
            <div className="img-field">
              <label>Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange} // Use new handler for file input
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

export default UpdateFeedback;
