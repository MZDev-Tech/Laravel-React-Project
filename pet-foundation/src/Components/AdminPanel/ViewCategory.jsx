import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from 'react-icons/md';
import Img1 from '../../Images/dogs/d6.jpg';
import './CSS/MainPage.css';
import AddCategory from './AddCategory';
import UpdateCategory from './UpdateCategory';
import DeleteCategory from './DeleteCategory';
import { toast } from 'react-toastify';

const Category = () => {
  // usestates for showing add,update,delete modal on page
  const [openPopup, setOpenPopup] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);


  //usesate hook to get category data fron database 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/fetchCategory');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };


  const handleEditClick = (id) => {
    setCurrentCategoryId(id);
    setUpdateModal(true);
  };

  const handleDeleteClick = (id) => {
    setCurrentCategoryId(id);
    setdeleteModal(true);
  };


  return (
    <>



      {openPopup && (<AddCategory setOpenPopup={setOpenPopup} refreshCategories={fetchCategories}/>)}
      {updateModal && (<UpdateCategory setUpdateModal={setUpdateModal} categoryId={currentCategoryId} refreshCategories={fetchCategories}/>)}
      {deleteModal && (<DeleteCategory setdeleteModal={setdeleteModal} categoryId={currentCategoryId} refreshCategories={fetchCategories}/>)}

      <>
        <section className="admin-page">
          <div className="page-top">
            <h2>Categories</h2>
            <button type="button" onClick={() => setOpenPopup(true)}>Add New</button>
          </div>


          <div className="table-part">
            <h2>Categories Detail</h2>
            <div className="table-section">
              <table width="100%" className="table ">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th style={{marginLeft:'120px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((category) => (

                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td><img src={`http://127.0.0.1:8000/storage/${category.image}`} alt={category.name} />
                      </td>
                      <td>{category.detail}</td>
                      <td className="actions">
                      <p className="action"><MdModeEditOutline className="action-icon" onClick={() => handleEditClick(category.id)} /></p>
                      <p className="action action2"><MdDeleteOutline className="action-icon" onClick={() => handleDeleteClick(category.id)} /></p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </>

    </>
  );
};

export default Category;
