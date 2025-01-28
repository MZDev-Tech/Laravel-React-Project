import React from 'react'
import CategoryBanner from './CategoryBanner';
import Ban2 from '../../Images/Banners/pupies (1).png';

const DogsBanner = () => {
  return (
    <>
     <CategoryBanner
        image={Ban2}
        heading="LOYALTY UNLEASHED"
        subHeading="Welcome To Dogs Page"
        detail="Having a pet means more fun, more joy. Explore our selection of loyal and loving pets ready to join your family."
      />
  
    </>
  )
}

export default DogsBanner
