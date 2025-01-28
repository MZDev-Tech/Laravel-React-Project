import React from 'react';
import {motion} from 'framer-motion'
import './Hero.css';



const Hero = () => {

  return (
    <>
      <div className="white-gradient"></div>

    <div className="hero sec-container">
        <div className='hero-content mt-4'>
          <motion.h1  initial={{y:100,opacity:0}} whileInView={{y:0,opacity:1}}  transition={{ delay:0.8, y: {type:"spring",stiffness:40}, opacity:{duration:1}, ease:"easeIn",}}
    viewport={{once:false,amount:0.1}}>
      Find Your Furry Soulmate </motion.h1>
          <motion.p initial={{y:100,opacity:0}} whileInView={{y:0,opacity:1}}  transition={{ delay:1, y: {type:"spring",stiffness:40}, opacity:{duration:0.6}, ease:"easeIn",}}
           viewport={{once:false,amount:0.1}}>Discover your new best friend today & give a loving home to a rescued pet!</motion.p>
        </div>
      </div>
    </>



  )
}

export default Hero
