import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from 'react-icons/md';
import './CSS/MainPage.css';
import AddFeedback from './AddFeedback';
import UpdateFeedback from './UpdateFeedback';
import DeleteFeedback from './DeleteFeedback';

const Feedback = () => {
  // usestates for showing add,update,delete modal on page
  const [openPopup, setOpenPopup] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);


  //usesate hook to get category data fron database 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/fetchFeedback');
      setData(res.data);
    } catch (err) {
      console.error('Error while fetching data :', err);
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



      {openPopup && (<AddFeedback setOpenPopup={setOpenPopup} refreshFeedback={fetchFeedback}  />)}
      {updateModal && (<UpdateFeedback setUpdateModal={setUpdateModal} currentId={currentId} refreshFeedback={fetchFeedback}  />)}
      {deleteModal && (<DeleteFeedback setdeleteModal={setdeleteModal} currentId={currentId} refreshFeedback={fetchFeedback}  />)}


      <>
        <section className="admin-page">
          <div className="page-top">
            <h2>Testimonials</h2>
            <button type="button" onClick={() => setOpenPopup(true)}>Add New +</button>
          </div>

          <div className="table-part">
            <h2>User Feedback</h2>
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
                      <td>{item.name}</td>
                      <td ><img src={`http://127.0.0.1:8000/storage/${item.image}`} alt="" />
                      </td>
                      <td >{item.location}</td>
                       <td className="actions">
                        <p className="action"><MdModeEditOutline className="action-icon" onClick={() => handleEditClick(item.id)} /></p>
                        <p className="action action2"><MdDeleteOutline className="action-icon" onClick={() => handleDeleteClick(item.id)} /></p>
                        <p className="action action2"><Link to={`/admin/showFeedback/${item.id}`}><FaEye className="action-icon" onClick={() => handleSingleFetch(item.id)} /></Link></p>
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

export default Feedback
