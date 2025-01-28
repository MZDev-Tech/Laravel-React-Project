import React, { useState, useEffect } from 'react';
import './Css/PetCategory.css';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Process from '../AdoptionProcess/Process';
import axios from 'axios';
import Preloader from '../Preloader/Preloader'

const CategoryBasedPets = ({ banner: BannerComponent, PetCategory, heading, subheading,setShowLoginModal,setUpdateProfile }) => {
  const [petData, setPetData] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fetchPet'); 
        setPetData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load pets data');
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    if (petData.length > 0) {
      const filtered = petData.filter((val) => val.category === PetCategory);
      setFilteredPets(filtered);
      setMessage(`Showing 1 - ${filtered.length} out of available ${petData.length} Pets`);
    }
  }, [petData, PetCategory]);

  if (loading) return <Preloader />;
  if (error) return <p>{ error}</p>;

  return (
    <>
      <Navbar setShowLoginModal={setShowLoginModal} setUpdateProfile={setUpdateProfile} />
      <BannerComponent />

      <div className="sec-container PetsCategory-part1">
        <div className="alert-header">
          <p className="alert-box1">{message}</p>
        </div>
        <div className='petCategory-Box'>
          {filteredPets.map((item) => (
            <Link key={item.id} to={`/pet/${item.id}`}>
              <div className="petCategory-card2">
                <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.pet} /> {/* Adjust URL if necessary */}
                <div className="petCategory-content">
                  <h3>{item.pet}</h3>
                  <div className="petCategory-data">
                    <p>Gender: <span>{item.gender}</span></p>
                    <p>Age: <span>{item.age}</span></p>
                  </div>
                  <p className="petCategory-price">RS {item.price}/-</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Process />
      <Footer/>
    </>
  );
};

export default CategoryBasedPets;
