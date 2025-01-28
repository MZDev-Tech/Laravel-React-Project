import React, { useState,useEffect } from 'react'
import './Sidebar.css'
import PetData from '../Database/PetData'

const Size = ({ setFilteredData }) => {

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

  const filterResult = (sizeVal) => {
    if (sizeVal === 'All') {
      setFilteredData(originalData);
    } else {
      const result = originalData.filter((currentItem) => {
        return currentItem.size === sizeVal;
      });
      console.log('Size Filtered results:', result); // Log the filtered results

      setFilteredData(result);
    }
  }

  return (
    <>

      <h3 className="sidebar-subtitle">Pet Size</h3>
      <div className="sidebar-part1">

        <label className="sidebar-radio-container">
          <input type="radio" name="size" onChange={() => filterResult('All')} />
          <span className='checkmark'></span>All
        </label>
        <label className="sidebar-radio-container">
          <input type="radio" name="size" onChange={() => filterResult('Small')} />
          <span className='checkmark'></span>Small
        </label>

        <label className="sidebar-radio-container">
          <input type="radio" name="size" onChange={() => filterResult('Medium')} />
          <span className='checkmark'></span>Medium
        </label>

        <label className="sidebar-radio-container">
          <input type="radio" name="size" onChange={() => filterResult('Large')} />
          <span className='checkmark'></span>Large
        </label>


      </div>
      <div className="line"></div>
    </>
  )
}

export default Size
