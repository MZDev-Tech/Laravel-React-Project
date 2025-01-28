import React, { useState,useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Sidebar.css';

const Price = ({ setFilteredData, setAlertMessage}) => {
    const [searchPrice, setSearchPrice] = useState('');

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

    const handleInput = (e) => {
        const input=e.target.value.replace(/[^0-9.]/g, '');
        setSearchPrice(input);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNaN(searchPrice) || searchPrice === '') {
            setAlertMessage('Please entered a valid number for price');
            setFilteredData(originalData);
            return;
        }

        const priceToFind = parseFloat(searchPrice);
        // Filter pets based on the entered price
        const filteredData = originalData.filter((currentItem) => {

            const petPrice = parseFloat(currentItem.price);

            return petPrice <= priceToFind;
        });
       
        setFilteredData(filteredData);

    };

    return (
        <>
            <h3 className="sidebar-subtitle">Filter By Price</h3>
            <div className="search-price">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchPrice}
                        onChange={handleInput}
                    />
                    <button type="submit" className="filterBtn">
                        <SearchIcon style={{ fontSize: '2rem' }} />
                    </button>
                </form>
            </div>
            <div className="line"></div>
        </>
    );
};

export default Price;
