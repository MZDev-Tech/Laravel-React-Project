import React from 'react'
import CategoryBanner from './CategoryBanner';
import Ban2 from '../../Images/Banners/rabbit3.png';

const RabbitBanner = () => {
  return (
    <>
     <CategoryBanner
        image={Ban2}
        heading="Bunny Buddies"
        subHeading="Welcome To Rabbits Page"
        detail="Having a pet means more fun, more joy. Explore our selection of Cute rabbits ready to join your family."
      />
  
    </>
  )
}

export default RabbitBanner
