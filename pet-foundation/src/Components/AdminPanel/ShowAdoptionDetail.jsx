import React, { useState, useEffect } from 'react';
import './CSS/MainPage.css';
import './CSS/DetailPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
 
const ShowAdoption = ( ) => {
  const { id } = useParams(); // Get the pet ID from the URL
  const [singleData, setData] = useState(null);

  useEffect(() => {
    const fetchSingleAdoption = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/singleAdoption/${id}`);
        setData(response.data);
        toast.success("Successfully showing single Adoption details..")
      } catch (err) {
        toast.error("Error while fetching single Adoption");
        console.error('Error fetching Adoption Details:', err);
      }
    };

    if (id) {
      fetchSingleAdoption();
    }
  }, [id]);

 


  return (
    <section className="admin-page">
      <div className="page-top">
        <h2>Single Adoption Detail</h2>
      </div>

      {singleData ? (
        <div className="detail-part">
          <div className="row">
          <div className="left-inside col-12">
                <img src={`http://127.0.0.1:8000/storage/${singleData.image}`} alt={singleData.pet} />
                <div>
                <button type="button" className="btn2"><Link to="/admin/Adoption">Go Back</Link></button>
                </div>
              </div>

              <div className='left-view col-lg-6 col-md-6 col-12'>

            <div className="info-item">
              <p className="label">Pet:</p>
              <p className="value">{singleData.pet}</p>
            </div>
            <div className="info-item">
              <p className="label">Category:</p>
              <p className="value">{singleData.category}</p>
            </div>
            <div className="info-item">
              <p className="label">Adopt Fee:</p>
              <p className="value">{singleData.fee}</p>
            </div>
            <div className="info-item">
              <p className="label">User:</p>
              <p className="value">{singleData.user}</p>
            </div>
            <div className="info-item">
              <p className="label">Email:</p>
              <p className="value">{singleData.email}</p>
            </div>
            <div className="info-item">
              <p className="label">Contact:</p>
              <p className="value">{singleData.contact}</p>
            </div>
            
          </div>

          <div className='right-view col-lg-6 col-md-6 col-12'>
          <div className="info-item">
              <p className="label">City:</p>
              <p className="value">{singleData.city}</p>
            </div>

            <div className="info-item">
              <p className="label">Address:</p>
              <p className="value">{singleData.shippingAddress}</p>
            </div>

            <div className="info-item">
              <p className="label">Date:</p>
              <p className="value">{singleData.date}</p>
            </div>
            <div className="info-item">
              <p className="label">Previous Pet: </p>
              <p className="value">{singleData.previous_pet}</p>
            </div>
            <div className="info-item">
              <p className="label">House :</p>
              <p className="value">{singleData.house}</p>
            </div>
            <div className="info-item">
              <p className="label">PetSpace: </p>
              <p className="value">{singleData.petspace}</p>
            </div>
          
          </div>

          <div className="bottom-view col-12 " >

          <h2 class="alert alert-secondary p-4">Pet Experience</h2>
          <p className="value">{singleData.experience}</p>
            </div>


       <div className="payment-view col-12">

            <h2 class="alert alert-secondary p-4">Payment Information</h2>
            <div className="info-item">
            <p className="label">Payment ID:</p>
            <p className="value">{singleData.payment_id}</p>
            </div>
            <div className="info-item">
            <p className="label">Payment Amount:</p>
            <p className="value">{singleData.payment_amount}</p>
            </div>
            <div className="info-item">

            <p className="label">Payment Currency:</p>
            <p className="value">{singleData.payment_currency}</p>
            </div>

            <div className="info-item">

            <p className="label">Order Number:</p>
            <p className="value">{singleData.orderNumber}</p>
            </div>
            <div className="info-item">
            <p className="label">Delivery Status: </p>
            <p className="value">{singleData.delivery_status}</p>
            </div>
          </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default ShowAdoption;
