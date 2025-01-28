import React, { useState } from 'react';
import './Css/Feedback.css'; 
import { toast } from 'react-toastify';
import axios from 'axios';

const Feedback = ({ feedbackModal, setFeedbackModal }) => {
  const [feedbackData, setFeedbackData] = useState({
    name:'',
    location: '',
    detail: '',
    image:null,
  });

  const handleInput = (e) => {
    const { name, value,type,files} = e.target;
    if(type==='file'){
        setFeedbackData(prevData=>({
            ...prevData,
            [name]: files[0], 
        }))
    }else{
        setFeedbackData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
    
  };

 //Send feedack data into database
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', feedbackData.name);
    formData.append('location', feedbackData.location);
    formData.append('detail', feedbackData.detail);
    formData.append('image', feedbackData.image);

    try {
      await axios.post('http://127.0.0.1:8000/api/addFeedback', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(`Thank you ${feedbackData.name} for sending us feedback`);
        setFeedbackModal(false);

    } catch (error) {
      toast.error("Try again, Unable to send feedback right now.");
    }
  };

  return (
    <div className={`modal-background2 ${feedbackModal ? 'show' : ''}`}>
      <div className="modal-content2">
        <span className="close-button" onClick={() => setFeedbackModal(false)}>×</span>
        <h2>User Feedback</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="Input-fields2">
          
          <div className="field2"> 
         <input type="text" name="name" value={feedbackData.name} onChange={handleInput} Placeholder="UserName"/>
         </div>

         <div className="field2">
           <input type="text" name="location" value={feedbackData.location} onChange={handleInput} Placeholder="Your Address"/>
            </div>

            <div className='field2'> 
            <textarea  name="detail" value={feedbackData.detail} onChange={handleInput} Placeholder="Type detail.." row="3"></textarea>
            </div>

            <div className="img-field">
                <label>Upload Image</label>
           <input type="file" name="image" onChange={handleInput}/>
            </div>

          </div>
          <button type="submit" className="submit-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
