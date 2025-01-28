import React, { useEffect, useState } from 'react';
import './CSS/PopupModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateCategory = ({ categoryId, setUpdateModal, refreshCategories }) => {
  const [updateData, setUpdateData] = useState({ name: '', detail: '', image: '' });
  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  //handle validation errors
  const[errors,handleErrors]=useState({});
  
  // Fetch existing Category data when component mounts or current Id changes
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/CategoryById/${categoryId}`);
        setUpdateData(response.data);
        setPreviewImage(`http://127.0.0.1:8000/storage/${response.data.image}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUpdateData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
  };

  const uploadCategory = async () => {
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
      await axios.post(`http://127.0.0.1:8000/api/updateCategory/${categoryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      refreshCategories();
      toast.success('Category updated successfully.');
      setUpdateModal(false); 
    } catch (error) {
      console.error('Error updating Category:', error);
      toast.error('Something went wrong while updating the Category.');
    }
  };


  //manage validation errors

  const validateForm=()=>{
    const newErrors={};
    if(!updateData.name){
      newErrors="Category name can't be left empty";
    }
    if(!updateData.detail){
      newErrors="Category detail can't be left empty";

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
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()){
      return;
    }
    await uploadCategory();
  };

  return (
    <div className={`popup-modalBg ${setUpdateModal ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={() => setUpdateModal(false)}>×</span>
        <h2>Update Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-fields">
            <div className="fieldAdd">
              <label>Category</label>
              <input type="text" name="name" value={updateData.name} onChange={handleInput} placeholder="Category" required />
              {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}

            </div>
            <div className="fieldAdd">
              <label>Description</label>
              <textarea name="detail" value={updateData.detail} onChange={handleInput} placeholder="Description" rows="3" required />
              {errors.detail && <div style={{ color: 'red', fontSize: '12px' }}>{errors.detail}</div>}

            </div>
            <div className="fieldAdd">
              <img src={previewImage || 'default image'} alt="category Category" width="80" height="80" />
            </div>
            <div className="img-field">
              <label>Upload New Image</label>
              <input type="file" name="image" onChange={handleImageChange} />
              {errors.image && <div style={{ color: 'red', fontSize: '12px' }}>{errors.image}</div>}

            </div>
          </div>
          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
