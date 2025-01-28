import React from 'react'
import CategoryBanner from './CategoryBanner';
import Ban2 from '../../Images/Banners/bird3.png';

const BirdsBanner = () => {
  return (
    <>
     <CategoryBanner
        image={Ban2}
        heading="Colorful Companions"
        subHeading="Welcome To Birds Page"
        detail="Having a pet means more fun, more joy. Explore our selection of loving birds ready to join your family."
      />
  
    </>
  )
}

export default BirdsBanner
