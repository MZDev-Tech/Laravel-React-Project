import React, { useState } from 'react';
import './CSS/PopupModal.css';
import axios from 'axios'
import { toast } from 'react-toastify';


const DeleteFeedback = ({ setdeleteModal,currentId,refreshFeedback }) => {

const handleDelete=async()=>{
try{
    await axios.delete(`http://127.0.0.1:8000/api/deleteFeedback/${currentId}`);
    setdeleteModal(false);
    refreshFeedback();
   toast.success('Feedback Data Delete Successfully..');

}catch(error){

    toast.error('Something went wrong while deleting..');
    console.log('Failed to delete: ',error);
}
}

    return (
        <div className={`popup-modalBg ${setdeleteModal ? 'show' : ''}`}>
            <div className="delete-popup">
                <div className="header">
                    <span className="deletepopup-button" onClick={() => setdeleteModal(false)}>×</span>
                    <h2>Delete Feedback</h2>
                </div>
                <div className="modal-body">
                    <p>{`Are you sure, you want to delete this record Id: ${currentId}`}</p>
                    <p class="text-warning"><small>This action cann't be Undo.</small></p>

                </div>

                <div className="footer">
                    <button type="button" className="btn btn-secondary delete-modalbtn" onClick={() => setdeleteModal(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger delete-modalbtn" onClick={()=>handleDelete()} >Delete</button>

                </div>

            </div>
        </div>
    );
};

export default DeleteFeedback
