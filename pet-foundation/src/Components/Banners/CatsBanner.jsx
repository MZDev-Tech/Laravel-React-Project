import React from 'react'
import CategoryBanner from './CategoryBanner';
import BanImg from '../../Images/Banners/cat2.png';

const CatsBanner = () => {
  return (
    <>
       <CategoryBanner
        image={BanImg}
        heading="Meet Feline Friends"
        subHeading="Welcome to cats page"
        detail="Having a pet means more fun, more joy. Explore our selection of loving Cats ready to join your family."
      />
    </>
  )
}

export default CatsBanner
