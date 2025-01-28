import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from 'react-icons/md';
import './CSS/MainPage.css';
import AddShelters from './AddShelters';
import UpdateShelters from './UpdateShelters';
import DeleteShelters from './DeleteShelters';
import { toast } from 'react-toastify';

const Shelters = () => {
  // usestates for showing add,update,delete modal on page
  const [openPopup, setOpenPopup] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);


  //usesate hook to get category data fron database 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/fetchShelter');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching Animal Shelters:', err);
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

  const handleSingleFetch=(id)=>{
    setCurrentId(id);

  }



  return (
    <>



      {openPopup && (<AddShelters setOpenPopup={setOpenPopup} refreshShelters={fetchShelters}/>)}
      {updateModal && (<UpdateShelters setUpdateModal={setUpdateModal} currentId={currentId} refreshShelters={fetchShelters}/>)}
      {deleteModal && (<DeleteShelters setdeleteModal={setdeleteModal} currentId={currentId} refreshShelters={fetchShelters}/>)}    

      <>
        <section className="admin-page">
          <div className="page-top">
            <h2>Animal Shelters</h2>
            <button type="button" onClick={() => setOpenPopup(true)}>Add New +</button>
          </div>

          <div className="table-part">
            <h2>Shelters Detail</h2>
            <div className="table-section">
              <table width="100%" className="table ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (

                    <tr key={item.id}>
                      <td class="description">{item.name}</td>
                      <td ><img src={`http://127.0.0.1:8000/storage/${item.image}`} alt="" />
                      </td>
                      <td >{item.location}</td>
                      <td className="actions">
                      <p className="action"><MdModeEditOutline className="action-icon" onClick={() => handleEditClick(item.id)} /></p>
                      <p className="action action2"><MdDeleteOutline className="action-icon" onClick={() => handleDeleteClick(item.id)} /></p>
                      <p className="action action2"><Link to={`/admin/showShelter/${item.id}`}><FaEye className="action-icon" onClick={() => handleSingleFetch(item.id)} /></Link></p>
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

export default Shelters
