import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from 'react-icons/md';
import './CSS/MainPage.css';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';


const User = () => {
  // usestates for showing add,update,delete modal on page
  const [openPopup, setOpenPopup] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);


  //usesate hook to get data fron database 
  const [data, setData] = useState([]);
  console.log('userdata',data);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/fetchUser');
      setData(res.data);
    } catch (err) {
      console.error('Error while fetching Data:', err);
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



      {openPopup && (<AddUser setOpenPopup={setOpenPopup} refreshUser={fetchUser} />)}
      {updateModal && (<UpdateUser setUpdateModal={setUpdateModal} currentId={currentId} refreshUser={fetchUser} />)}
      {deleteModal && (<DeleteUser setdeleteModal={setdeleteModal} currentId={currentId} refreshUser={fetchUser} />)}
     

      <>
        <section className="admin-page">
          <div className="page-top">
            <h2>Registered Users</h2>
            <button type="button" onClick={() => setOpenPopup(true)}>Add New +</button>
          </div>

          <div className="table-part">
            <h2>User Detail</h2>
            <div className="table-section">
              <table width="100%" className="table ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                
                  {data.map((item) => (
              
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td >{item.email}</td>
                      <td className="actions">
                      <p className="action"><MdModeEditOutline className="action-icon" onClick={() => handleEditClick(item.id)} /></p>
                      <p className="action action2"><MdDeleteOutline className="action-icon" onClick={() => handleDeleteClick(item.id)} /></p>
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

export default User
