import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from 'react-icons/md';
import './CSS/MainPage.css';
import AddPets from './AddPets';
import UpdatePets from './UpdatePets';
import DeletePets from './DeletePets';
import { toast } from 'react-toastify';


const Pets = () => {
  // usestates for showing add,update,delete modal on page
  const [openPopup, setOpenPopup] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);


  //usesate hook to get data fron database 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/fetchPet');
      setData(res.data);
    } catch (err) {
      console.error('Error while fetching :', err);
    }
  };


  const handleEditClick = (id) => {
    setCurrentId(id);
    setUpdateModal(true);
  };

  const handleDeleteClick = (id) => {
    setCurrentId(id);
    setdeleteModal(true);
  };

  const handleSingleFetch = (id) => {
    setCurrentId(id);

  }



  return (
    <>



      {openPopup && (<AddPets setOpenPopup={setOpenPopup} refreshPets={fetchPets}  />)}
      {updateModal && (<UpdatePets setUpdateModal={setUpdateModal} currentId={currentId} refreshPets={fetchPets}  />)}
      {deleteModal && (<DeletePets setdeleteModal={setdeleteModal} currentId={currentId} refreshPets={fetchPets}  />)}

      <>
        <section className="admin-page">
          <div className="page-top">
            <h2>Available Pets</h2>
            <button type="button" onClick={() => setOpenPopup(true)}>Add New +</button>
          </div>

          <div className="table-part">
            <h2>Pets Detail</h2>
            <div className="table-section">
              <table width="100%" className="table ">
                <thead>
                  <tr>
                    <th>Pet</th>
                    <th>Image</th>
                    <th>Breed</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (

                    <tr key={item.id}>
                                        
                      <td >{item.pet}</td>
                      <td ><img src={`http://127.0.0.1:8000/storage/${item.image}`} alt="" /></td>
                      <td >{item.breed}</td>
                      <td className="status"><span>{item.status}</span></td>
                      
                      <td className="actions">
                        <p className="action"><MdModeEditOutline className="action-icon" onClick={() => handleEditClick(item.id)} /></p>
                        <p className="action action2"><MdDeleteOutline className="action-icon" onClick={() => handleDeleteClick(item.id)} /></p>
                        <p className="action action2">        
                          <Link to={`/admin/ShowPets/${item.id}`}><FaEye className="action-icon" onClick={() => handleSingleFetch(item.id)} /></Link></p>
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

export default Pets
