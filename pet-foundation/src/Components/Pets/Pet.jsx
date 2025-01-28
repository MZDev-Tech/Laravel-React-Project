import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Pet.css';
import Title from '../Title/Title.jsx';
import PetCard from './PetCard.jsx';
import EastIcon from '@mui/icons-material/East.js';
import { Link } from 'react-router-dom';

const Pet = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/fetchPet');
        const result = await response.json();
        setPets(result.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Title subTitle="Our Pets" Title="Take a look at pets" />
      <motion.section
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="pets-cards"
      >
        {pets.map((pet, index) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            image={pet.image}
            pet={pet.pet}
            gender={pet.gender}
            age={pet.age}
            price={pet.price}
            delay={index * 0.2} // Calculate delay based on index
          />
        ))}
      </motion.section>
      <button type="button" className="pet-all-btn">
        <Link to="/pets">
          View All <EastIcon className="btn-icon" />
        </Link>
      </button>
    </>
  );
}

export default Pet;
