import React from 'react';
import './Pet.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PetCard = (props) => {
  return (
    <motion.div 
      className="pet-card1"
      initial={{ opacity: 0, y: 20 }} // Initial state: hidden and slightly below
      animate={{ opacity: 1, y: 0 }}  // Animate to visible and original position
      transition={{ duration: 0.6, delay: props.delay }}  // Use the delay prop here
    >
      <Link to={`/pet/${props.id}`}>
        <img 
          src={`http://127.0.0.1:8000/storage/${props.image}`} 
          alt={props.pet}
        /> 
        <div className="pet-content">
          <h3>{props.pet}</h3>
          <div className="pet-data">
            <p>Gene:<span>{props.gender}</span></p> 
            <p>Age:<span>{props.age}</span></p>
          </div>
          <p>Rs. {props.price}/-</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default PetCard;
