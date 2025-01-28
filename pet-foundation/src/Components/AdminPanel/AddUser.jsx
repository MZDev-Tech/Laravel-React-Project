import React, { useState } from 'react';
import './CSS/PopupModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddUser = ({ setOpenPopup, refreshUser }) => {
  const [addData, setAddData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const[errors,handleErrors]=useState({});

    // Simplified validation function
const validateForm=()=>{
  const newErrors={};
  if(!addData.name){
  newErrors.name="UserName is required";
  }
  if(!addData.email){
    newErrors.email="User Email is required";
  }
  if(!addData.password){
    newErrors.password="Password is required";
  }
  if(addData.password && addData.password.length < 6){
    newErrors.password="Password must be at least 6 characters long.";
  }
  
  handleErrors(newErrors);
  return Object.keys(newErrors).length===0;
};

  const handleInput = (e) => {
    const { name, value } = e.target;
    
    // Validate input on change
    setAddData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!validateForm()){
      return;
    }

   

    try {
      await axios.post('http://127.0.0.1:8000/api/addUser', addData);
      setOpenPopup(false);
      refreshUser();
      toast.success('User added successfully.');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message}`);
        console.error('Server error:', error.response.data);
      } else {
        toast.error('Something went wrong while adding.');
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className={`popup-modalBg ${setOpenPopup ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setOpenPopup(false)}>×</span>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
            <div className="fieldAdd">
              <input
                type="text"
                name="name"
                value={addData.name}
                onChange={handleInput}
                placeholder="UserName"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="fieldAdd">
              <input
                type="text"
                name="email"
                value={addData.email}
                onChange={handleInput}
                placeholder="Email ID"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="fieldAdd">
              <input
                type="password"  // Change to password type
                name="password"
                value={addData.password}
                onChange={handleInput}
                placeholder="Password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
          </div>
          <button type="submit" className="submit-btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
