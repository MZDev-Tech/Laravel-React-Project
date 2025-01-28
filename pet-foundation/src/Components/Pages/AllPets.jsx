import React, { useState, useEffect } from 'react';
import './Css/AllPets.css';
import Sidebar from '../ProductSidebar/Sidebar';
import Recommended from '../ProductSidebar/Recommended';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Header/Navbar';

const AllPets = ({ setShowLoginModal,setUpdateProfile }) => {
  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [alertMessage, setAlertMessage] = useState('Loading pets...');
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const location = useLocation();

  // Helper function to parse query parameters
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fetchPet');
        const data = await response.json();
        setAllPets(data);
        setFilteredPets(data);
        setAlertMessage(`Showing 1 - ${data.length} available Pets`);

        // After fetching, apply filters if query parameters are present
        const params = getQueryParams(location.search);
        const category = params.get('category');
        const city = params.get('city');

        if (category || city) {
          const filtered = data.filter(pet => {
            return (
              (!category || pet.category === category) &&
              (!city || pet.location === city)
            );
          });
          handleFilteredPets(filtered);
        }
      } catch (error) {
        setAlertMessage('Error fetching data');
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchData();
  }, [location.search]);

  const handleFilteredPets = (filteredData) => {
    if (filteredData.length === 0) {
      setAlertMessage('Nothing Found');
    } else {
      const totalPets = allPets.length;
      const startFrom = 1;
      const endTo = filteredData.length;
      setAlertMessage(`Showing ${startFrom} - ${endTo} results out of ${totalPets} pets`);
    }
    setFilteredPets(filteredData); // Update state
  };

  return (
    <>
      <Navbar setShowLoginModal={setShowLoginModal} setUpdateProfile={setUpdateProfile}/>
      <div className="pets-filter">

        <div className={`sidebar-left ${showSidebar ? 'active' : ''}`}>
          <Sidebar setFilteredPets={handleFilteredPets} setAlertMessage={setAlertMessage} showSidebar={showSidebar} />
        </div>

        <div className='pets-rightPart'>
          <div className="pets-header">
            <div className="alert alert-box">{alertMessage}</div>
            <button type="button" className="header-btn" onClick={() => {
              setShowSidebar(!showSidebar);
              console.log(showSidebar ? 'Hide Filters clicked' : 'Show Filters clicked');
            }}>
              {showSidebar ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <Recommended setFilteredData={setFilteredPets} setAlertMessage={setAlertMessage} />

          <div className='product-right'>
            {loading ? ( // Check if loading
              <div className="loading">
                <div className="spinner-grow text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>

                <p style={{ fontSize: '1.5rem' }}>Loading pets...</p>
              </div>
            ) : filteredPets.length > 0 ? (
              filteredPets.map((item) => (
                <Link key={item.id} to={`/pet/${item.id}`} className="allpet-card2-link">
                  <div className="allpet-card2">
                    <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt={item.pet} />
                    <div className="allpet-content">
                      <h3>{item.pet}</h3>
                      <div className="allpet-data">
                        <p>Gender: <span>{item.gender}</span></p>
                        <p>Age: <span>{item.age}</span></p>
                      </div>
                      <p className="price">Rs {item.price}/-</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No pets available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPets;
