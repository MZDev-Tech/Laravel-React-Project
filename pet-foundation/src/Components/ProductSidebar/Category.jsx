import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Category = ({ setFilteredData }) => {
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fetchPet');
        const data = await response.json();
        setOriginalData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterResult = (catItem) => {
    if (catItem === 'All') {
      setFilteredData(originalData);
    } else {
      const result = originalData.filter((item) => item.category === catItem);
      setFilteredData(result);
    }
  };

  return (
    <>
      <h3 className="sidebar-subtitle">Categories</h3>
      <div className="sidebar-part1">
        <label className="sidebar-radio-container">
          <input
            type="radio"
            name="category"
            onChange={() => filterResult('All')}
          />
          <span className="checkmark"></span>All
        </label>

        <label className="sidebar-radio-container">
          <input
            type="radio"
            name="category"
            onChange={() => filterResult('Cats')}
          />
          <span className="checkmark"></span>Cats
        </label>

        <label className="sidebar-radio-container">
          <input
            type="radio"
            name="category"
            onChange={() => filterResult('Birds')}
          />
          <span className="checkmark"></span>Birds
        </label>

        <label className="sidebar-radio-container">
          <input
            type="radio"
            name="category"
            onChange={() => filterResult('Dogs')}
          />
          <span className="checkmark"></span>Dogs
        </label>

        <label className="sidebar-radio-container">
          <input
            type="radio"
            name="category"
            onChange={() => filterResult('Rabbits')}
          />
          <span className="checkmark"></span>Rabbits
        </label>
      </div>
      <div className="line"></div>
    </>
  );
};

export default Category;
