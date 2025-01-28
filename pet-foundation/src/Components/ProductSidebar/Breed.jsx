import React, { useState,useEffect} from 'react';
import './Sidebar.css';
import SearchIcon from '@mui/icons-material/Search';

const Breed = ({ setFilteredData, setAlertMessage }) => {
  const [searchBreed, setSearchBreed] = useState('');
  const [originalData,setOriginalData] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
    const response = await fetch('http://127.0.0.1:8000/api/fetchPet');
    const data = await response.json();
    setOriginalData(data);
      }catch(err){
        console.error('Error fetching data:', err);
      }
    }
    fetchData();

  },[]);
  const handleInput = (event) => {
    const input = event.target.value;
    setSearchBreed(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(searchBreed) && searchBreed !== '') {
      const filteredData = originalData.filter((item) =>
        item.breed.toLowerCase().includes(searchBreed.toLowerCase())
      );

      if (filteredData.length === 0) {
        setAlertMessage('No pets found for this breed.');
      } else {
        setAlertMessage(`Showing pets of breed: ${searchBreed}`);
      }

      setFilteredData(filteredData);
    } else {
      setFilteredData(originalData);
      setAlertMessage('Please enter a valid breed to search.');
    }
  };

  return (
    <>
      <h3 className="sidebar-subtitle">Filter By Breed</h3>
      <div className="search-price">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchBreed}
            onChange={handleInput}
          />
          <button type="submit" className="filterBtn">
            <SearchIcon style={{ fontSize: '2rem' }} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Breed;
