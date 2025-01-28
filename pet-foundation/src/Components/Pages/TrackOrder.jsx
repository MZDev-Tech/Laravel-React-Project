import React, { useState } from 'react';
import './Css/Contact.css';
import './Css/TrackOrder.css';
import { toast } from 'react-toastify';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import trackImg from '../../Images/track4.png'

const TrackOrder = ({ setShowLoginModal, setUpdateProfile }) => {

  const [trackStatus, setTrackStatus] = useState({
    orderNumber: '',
    contact: '',
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTrackStatus(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/trackOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackStatus),
      });

      // Ensure you get a valid JSON response
      const data = await response.json();

      // Check if response contains adoption details
      if (data && data.adoptionDetails) {
        navigate('/myAdoptions', { state: { adoptionDetails: data.adoptionDetails } });
        toast.success('Order Track Successfully');
      } else {
        toast.error('No adoption details found');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Unable to Track now, Plz try again..');
    }
  };



  return (
    <>
      <Navbar setShowLoginModal={setShowLoginModal} setUpdateProfile={setUpdateProfile} />

      <div className="main-trackpart">

        <div className="track-parent">

          <div className="track-right">
            <img src={trackImg} alt="" />
          </div>
          <div className="TrackForm track-left">
            <h2 className="track-heading">Track Your Order</h2>

            <form onSubmit={handleSubmit}>
              <div className="track-fields">
                <input type="text" name="orderNumber" value={trackStatus.orderNumber} onChange={handleInput} Placeholder="Order Number" />
                <input type="text" name="contact" value={trackStatus.contact} onChange={handleInput} placeholder='Mobile Number' />
              </div>
              <button type="submit" className="track-btn">Track</button>

            </form>
          </div>


        </div>
      </div>

      <Footer />

    </>
  );
};

export default TrackOrder
