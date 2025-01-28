import React,{useState} from 'react';
import Hero from '../Hero/Hero';
import Search from '../Search/Search';
import About from '../About/About';
import Category from '../Category/Category';
import Pets from '../Pets/Pet';
import Poster from '../Poster2/Poster';
import Testimonial from '../CustomerTestimonials/Customer';
import Banner from '../Banners/Banner';
import dogBan2 from '../../Images/Banners/homeBan.png';
import AdoptionProcess from '../AdoptionProcess/Process';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';

const Home = ({setShowLoginModal,setUpdateProfile}) => {

  return (
    <>
      <Navbar setShowLoginModal={setShowLoginModal} setUpdateProfile={setUpdateProfile} />
      <Hero />
          <Search /> 
          <Category />
          <About />
          <Pets />
          <Banner 
  image={dogBan2} 
  heading="Find Perfect Companion" 
  subHeading="Discover Unconditional Love" 
  detail="Explore our selection of pets looking for loving homes. Adopt today & make a difference in a pet's life."
/>
          <Testimonial/>
           <Poster/> 
           <AdoptionProcess/>
           <Footer />

    </>
  )
}

export default Home
