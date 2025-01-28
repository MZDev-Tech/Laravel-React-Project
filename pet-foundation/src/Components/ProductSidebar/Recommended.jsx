import React, { useState,useEffect } from 'react';
import './Sidebar.css';

const Recommended = ({ setFilteredData, setAlertMessage }) => {
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
  const filterResult = (PassVal) => {
    let filteredData = [];

    switch (PassVal) {
      case 'Puppies':
        filteredData = originalData.filter(item => item.category === 'Dogs' && CheckPetsAge(item.age));
        break;
      case 'Kittens':
        filteredData = originalData.filter(item => item.category === 'Cats' && CheckPetsAge(item.age));
        break;
      case 'Parrots':
        filteredData = originalData.filter(item => item.category === 'Birds' && item.breed === 'Parrot');
        break;
      case 'Trained':
        filteredData = originalData.filter(item => item.ease_of_training === 'High');
        break;
      default:
        filteredData = originalData;
    }

    if (filteredData.length === 0) {
      setAlertMessage(`No ${PassVal} found.`);
    } else {
      setAlertMessage(`Showing ${PassVal}.`);
    }

    setFilteredData(filteredData);
  };

// function to find puppies & kittens based on pets age
const CheckPetsAge = (ageVal) => {
  const [age, unit] = ageVal.split(' '); // Split ageVal into age and unit

  if (unit === 'months' || unit === 'month') {
    return parseInt(age) <= 12; // Convert age to integer and check if less than or equal to 12 months
  } else if (unit === 'years' || unit === 'year') {
    return parseInt(age) <= 1; // Convert age to integer and check if less than or equal to 1 year
  } else {
    return false; // Default to false if unit is not recognized
  }
};

  

  return (
    <div className="recommended-part">
      <h2>Recommended</h2>
      <button type="button" onClick={() => filterResult('Puppies')}>
        Puppies
      </button>
      <button type="button" onClick={() => filterResult('Kittens')}>
        Kittens
      </button>
      <button type="button" onClick={() => filterResult('Parrots')}>
        Parrots
      </button>
      <button type="button" onClick={() => filterResult('Trained')}>
        Trained Pets
      </button>
    </div>
  );
};

export default Recommended;
