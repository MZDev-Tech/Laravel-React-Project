import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from 'react-icons/md';
import './CSS/MainPage.css';
import UpdateAdoption from './UpdateAdoption';
import DeleteAdoption from './DeleteAdoption';

const Adoption = () => {
  // usestates for showing add,update,delete modal on page
  const [openPopup, setOpenPopup] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);


  //usesate hook to get category data fron database 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAdoption();
  }, []);

  const fetchAdoption = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/fetchAdoption');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching Animal Adoption:', err);
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



      {updateModal && (<UpdateAdoption setUpdateModal={setUpdateModal} currentId={currentId} refreshAdoption={fetchAdoption}/>)}
      {deleteModal && (<DeleteAdoption setdeleteModal={setdeleteModal} currentId={currentId} refreshAdoption={fetchAdoption}/>)}    

      <>
        <section className="admin-page">
          <div className="page-top">
            <h2>Pets Adoption</h2>
          </div>

          <div className="table-part">
            <h2>Adoption Requests</h2>
            <div className="table-section">
              <table width="100%" className="table ">
                <thead>
                  <tr>
                    <th>Pet</th>
                    <th>Image</th>
                    <th>User</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (

                    <tr key={item.id}>
                      <td class="description">{item.pet}</td>
                      <td ><img src={`http://127.0.0.1:8000/storage/${item.image}`} alt="" /></td>
                      <td>{item.user}</td>
                      <td>{item.contact}</td>
                      <td>{item.delivery_status}</td>

                                           <td className="actions">
                      <p className="action"><MdModeEditOutline className="action-icon" onClick={() => handleEditClick(item.id)} /></p>
                      <p className="action action2"><MdDeleteOutline className="action-icon" onClick={() => handleDeleteClick(item.id)} /></p>
                      <p className="action action2"><Link to={`/admin/showAdoption/${item.id}`}><FaEye className="action-icon" onClick={() => handleSingleFetch(item.id)} /></Link></p>
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

export default Adoption
