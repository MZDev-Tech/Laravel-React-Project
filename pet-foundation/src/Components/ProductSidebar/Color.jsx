import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Color = ({ setFilteredData }) => {
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fetchPet');
        const data = await response.json();
        
        // Convert color to uppercase for consistency
        const modifiedData = data.map(item => ({
          ...item,
          color: item.color.toUpperCase(), // Assuming color is a string
        }));
        
        setOriginalData(modifiedData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    
    fetchData();
  }, []);

  const filterResult = (colorVal) => {
    if (colorVal === 'All') {
      setFilteredData(originalData);
    } else {
      const result = originalData.filter((currentItem) => {
        return currentItem.color.includes(colorVal.toUpperCase()); // Ensure colorVal is uppercase
      });
    
      setFilteredData(result);
    }
  };

  return (
    <>
      <h3 className="sidebar-subtitle">Pets Colors</h3>
      <div className="sidebar-part1">
        <label className="sidebar-radio-container">
          <input type="radio" name="color" onChange={() => filterResult('All')} />
          <span className='checkmark'></span>All
        </label>
        <label className="sidebar-radio-container">
          <input type="radio" name="color" onChange={() => filterResult('Brown')} />
          <span className='checkmark'></span>Brown
        </label>

        <label className="sidebar-radio-container">
          <input type="radio" name="color" onChange={() => filterResult('Black')} />
          <span className='checkmark'></span>Black
        </label>

        <label className="sidebar-radio-container">
          <input type="radio" name="color" onChange={() => filterResult('White')} />
          <span className='checkmark'></span>White
        </label>

        <label className="sidebar-radio-container">
          <input type="radio" name="color" onChange={() => filterResult('Gray')} />
          <span className='checkmark'></span>Gray
        </label>
      </div>
      <div className="line"></div>
    </>
  );
}

export default Color;
