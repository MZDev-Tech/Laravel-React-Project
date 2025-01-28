import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Search.css';
import {useNavigate} from 'react-router-dom'


const Search = () => {
  const [data, setData] = useState({
    category: "",
    city: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    // Fetch all pets from the server and extract unique categories and cities
    const fetchPets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fetchPet');
        const pets = await response.json();

        // Extract unique values for categories and cities
        const unique = (key) => [...new Set(pets.map((pet) => pet[key]))];

        setCategories(unique('category'));
        setCities(unique('location'));
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
        // Navigate to AllPets page with category and city as query parameters
        navigate(`/pets?category=${data.category}&city=${data.city}`);

  };

  return (
    <div  
     className="sec-container container search-component"  >
      <div className="row justify-content-center align-item-center " >
        <div className="col-lg-8 shadow rounded search-box" >
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-5 col-md-5 col-6 mx-auto box">
                <label>Pet Category</label>
                <select
                  name="category"
                  value={data.category}
                  className="form-select"
                  onChange={handleInput}
                >
                  <option selected>Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-5 col-md-5 col-6 mx-auto box">
                <label>Select City</label>
                <select
                className="form-select"
                  name="city"
                  value={data.city}
                  onChange={handleInput}
                >
                  <option selected>Choose City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-2 col-md-2 col-12 mx-auto search-btn">
                <input type="submit" className="btn " value="SEARCH" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;


