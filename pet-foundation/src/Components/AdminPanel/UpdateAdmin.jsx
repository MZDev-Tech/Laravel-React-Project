import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import Img from '../../Images/Customers/cus2.jpg'; // Placeholder image
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const UpdateAdmin = ({ currentId, setUpdateModal, refreshAdmin }) => {
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    password: '', // Keep password as empty by default
    image: '',
  });

  const [showPassword,setShowPassword]=useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch existing Admin data when component mounts or currentId changes
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token=sessionStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/getAdminById/${currentId}`,{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        });
        setUpdateData({
          name : response.data.name,
          email:response.data.email,
          password:'', // Keep password empty for security reasons
          image:response.data.image,
        });
        setPreviewImage(`http://127.0.0.1:8000/storage/${response.data.image}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentId) {
      fetchAdminData();
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

  const uploadAdmin = async () => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', updateData.name);
    formData.append('email', updateData.email);
    
    // Only add password if it is updated
    if (updateData.password.trim()) {
      formData.append('password', updateData.password);
    }

    if (fileImage) {
      formData.append('image', fileImage);
    }

    try {
      const token=sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/updateAdmin/${currentId}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization:`Bearer ${token}`,
         },
      });
      refreshAdmin();
      toast.success('Admin updated successfully.');
      setUpdateModal(false); 
    } catch (error) {
      console.error('Error updating Admin:', error);
      toast.error('Something went wrong while updating the Admin.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadAdmin();
  };

  return (
    <div className={`popup-largerModel ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
            <div className="fieldAdd">
              <label>Admin</label>
              <input
                type="text"
                name="name"
                value={updateData.name}
                onChange={handleInput}
                required
              />
            </div>

            <div className="fieldAdd">
              <label>Email ID</label>
              <input
                type="text"
                name="email"
                value={updateData.email}
                onChange={handleInput}
                required
              />
            </div>

            <div className="fieldAdd password-wrapper">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={updateData.password}
                onChange={handleInput}
                placeholder='Update Previous Password (optional)'
              />
              <span className="password-toggle" onClick={()=>setShowPassword(!showPassword)}> {showPassword ? <IoEyeOffOutline className="eye-icon"/> : <IoEyeOutline className="eye-icon"/>}</span>
            </div>
            
            <div className="fieldAdd">
              <img
                src={previewImage}
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
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdmin;
