import React, { useState, useEffect } from 'react';
import './CSS/MainPage.css';
import './CSS/DetailPage.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
 
const ShowPets = ( ) => {
  const { id } = useParams(); // Get the pet ID from the URL
  const [singleData, setData] = useState(null);

  useEffect(() => {
    const fetchSinglePet = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/PetById/${id}`);
        setData(response.data);
        toast.success("Successfully showing single pet details..")
      } catch (err) {
        toast.error("Error while fetching single pet");
        console.error('Error fetching Pet Details:', err);
      }
    };

    if (id) {
      fetchSinglePet();
    }
  }, [id]);

 


  return (
    <section className="admin-page">
      <div className="page-top">
        <h2>Single Pet Detail</h2>
      </div>

      {singleData ? (
        <div className="detail-part">
          <div className="row">
          <div className="left-inside col-12">
                <img src={`http://127.0.0.1:8000/storage/${singleData.image}`} alt={singleData.pet} />
                <div>
                <button type="button" className="btn2"><Link to="/admin/pets">Go Back</Link></button>
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
              <p className="label">Gender:</p>
              <p className="value">{singleData.gender}</p>
            </div>
            <div className="info-item">
              <p className="label">Age:</p>
              <p className="value">{singleData.age}</p>
            </div>
            <div className="info-item">
              <p className="label">Size:</p>
              <p className="value">{singleData.size}</p>
            </div>
            <div className="info-item">
              <p className="label">Breed:</p>
              <p className="value">{singleData.breed} </p>
            </div>

            <div className="info-item">
              <p className="label">Training:</p>
              <p className="value">{singleData.ease_of_training} level trained</p>
            </div>
          </div>

          <div className='right-view col-lg-6 col-md-6 col-12'>
            <div className="info-item">
              <p className="label">Color:</p>
              <p className="value">{singleData.color}</p>
            </div>
            <div className="info-item">
              <p className="label">Health: </p>
              <p className="value">{singleData.health}</p>
            </div>

            <div className="info-item">
              <p className="label">Energy : </p>
              <p className="value"> {singleData.energylevel} energy level</p>
            </div>
            <div className="info-item">
              <p className="label">Vendor</p>
              <p className="value">{singleData.vendor}</p>
            </div>
            <div className="info-item">
              <p className="label">Date: </p>
              <p className="value">{singleData.publish_date}</p>
            </div>
            <div className="info-item">
              <p className="label">Status: </p>
              <p className="value">{singleData.status}</p>
            </div>
          </div>

          <div className="bottom-view col-12 " >
            <p className="label">Description:</p>
            <p className="value">{singleData.detail}</p>
          </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default ShowPets;
