import React, { useState } from 'react';
import './CSS/PopupModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddFeedback = ({ setOpenPopup,refreshFeedback}) => {
  const [addData, setAddData] = useState({
    name: '',
    location: '',
    detail: '',
    image: null,
  });

  const[errors,handleErrors]=useState({});
  const validateForm=()=>{
    const newErrors={};
    if(!addData.name){
    newErrors.name="Category filed is required";
    }else if(addData.name.length > 255){
      newErrors.name = 'Name must not exceed 255 characters';
    }
    if(!addData.location){
      newErrors.location="Category filed is required";
      }else if(addData.location.length > 255){
        newErrors.location = 'Name must not exceed 255 characters';
      }
    if(!addData.detail){
      newErrors.detail="Category detail is required";
    }
    if(addData.image && addData.image.size > 5*1024*1024){
    newErrors.image="Image size must be less then 5MB";
    }
    else if(addData.image && !['image/jpeg','image/jpg','image/gif','image/png'].includes(addData.image.type)){
    newErrors.image="Only JPG, PNG, and GIF formats are allowed."
    }
  
    handleErrors(newErrors);
    return Object.keys(newErrors).length===0;
  };

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;
    console.log(files)
    if (type === 'file') {
      setAddData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setAddData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!validateForm()){
      return;
    }
    
    const formData = new FormData();
    formData.append('name', addData.name);
    formData.append('location', addData.location);
    formData.append('detail', addData.detail);
    formData.append('image', addData.image);

    try {
      await axios.post('http://127.0.0.1:8000/api/addFeedback', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setOpenPopup(false); 
      refreshFeedback();
      toast.success('Feedback added successfully..');

    } catch (error) {
      toast.error('Something went wrong while adding ..');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={`popup-modalBg ${setOpenPopup ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setOpenPopup(false)}>×</span>
        <h2>Add New Feedback</h2>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="Input-fields">
            <div className="fieldAdd">
              <input
                type="text"
                name="name"
                value={addData.name}
                onChange={handleInput}
                placeholder="UserName"
              />
      {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}

            </div>

            <div className="fieldAdd">
              <input
                type="text"
                name="location"
                value={addData.location}
                onChange={handleInput}
                placeholder="Location"
              />
        {errors.location && <div style={{ color: 'red', fontSize: '12px' }}>{errors.location}</div>}

            </div>

            <div className='fieldAdd'>
              <textarea
                name="detail"
                value={addData.detail}
                onChange={handleInput}
                placeholder="Description"
                rows="3"
              ></textarea>
      {errors.detail && <div style={{ color: 'red', fontSize: '12px' }}>{errors.detail}</div>}

            </div>

    

            <div className="img-field">
              <label>Upload Image</label>
              <input type="file" name="image" onChange={handleInput} />
              {errors.image && <div style={{ color: 'red', fontSize: '12px' }}>{errors.image}</div>}

            </div>
          </div>
          <button type="submit" className="submit-btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddFeedback
