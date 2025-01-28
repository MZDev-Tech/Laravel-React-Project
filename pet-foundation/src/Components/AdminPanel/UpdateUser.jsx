import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";


const UpdateUser = ({ currentId, setUpdateModal, refreshUser }) => {
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    password: '',
    
  });
 const [showPassword,setShowPassword]=useState(false);
  const[errors,handleErrors]=useState({});

  // Simplified validation function
const validateForm=()=>{
const newErrors={};
if(!updateData.name){
newErrors.name="UserName is required";
}
if(!updateData.email){
  newErrors.email="User Email is required";
}
if(!updateData.password){
  newErrors.password="Password is required";
}
if(updateData.password && updateData.password.length < 6){
  newErrors.password="Password must be at least 6 characters long.";
}

handleErrors(newErrors);
return Object.keys(newErrors).length===0;
};

  // Fetch existing category data when component mounts or currentId changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/getUserById/${currentId}`);
        const user = response.data;
        setUpdateData({
          name: user.name,
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentId) {
      fetchUserData();
    }
  }, [currentId]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    
      setUpdateData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(!validateForm()){
      return;
    }
  
    try {
      await axios.put(`http://127.0.0.1:8000/api/updateUser/${currentId}`, updateData);
      setUpdateModal(false);
      refreshUser();
      toast.success('User Data updated successfully..');
    } catch (error) {
      toast.error('Something went wrong while updating User..');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className={`popup-modalBg ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
          <label>UseName</label>

            <div className="fieldAdd">
              <input
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleInput}
                placeholder="User"
                required
              />
      {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
            </div>

            <div className="fieldAdd">
            <label>Email</label>

              <input
                type="text"
                name="email"
                value={updateData.email}
                onChange={handleInput}
                placeholder="email"
                required
              />
              {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
            </div>

           
            <div className="fieldAdd password-wrapper">
            <label>Password</label>

              <input
                type={showPassword ? "text":"password"}
                name="password"
                value={updateData.password}
                onChange={handleInput}
                placeholder="Add new Password(optional)"
                required
              />
              <span className="password-toggle" onClick={()=>setShowPassword(!showPassword)}> {showPassword ? <IoEyeOffOutline className="eye-icon"/> : <IoEyeOutline className="eye-icon"/>}</span>
              
 
            {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>} 
            </div>
    
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser
