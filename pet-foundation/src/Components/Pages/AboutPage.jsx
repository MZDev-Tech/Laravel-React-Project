import React from 'react';
import './Css/AboutPage.css';
import Process from '../AdoptionProcess/Process'
import About from '../About/About'
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { Link } from 'react-router-dom'
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import PageLanding from './PageLanding';
import { motion } from 'framer-motion'



const AboutPage = ({ setShowLoginModal , setUpdateProfile }) => {
  return (
    <>
      <Navbar setShowLoginModal={setShowLoginModal} setUpdateProfile={setUpdateProfile}/>
        <PageLanding
          head="About Us"
          parah="We are dedicated to provide exceptional support & solutions tailored to your needs."
        />

      <div className="about-sec">
        <About />
      </div>
      <section className='video-area pt-100'>
        <div className='container'>
          <div className='row justify-content-center align-items-center d-flex relative'>
            <div className="col-lg-8">
              <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{
                delay: 0.6,
                y: { type: 'spring', stiffness: 20 },
                opacity: { duration: 0.6 },
                ease: "easeIn",
              }}
                viewport={{ once: false, amount: 0.1 }}

                className="about-video-right justify-content-center align-items-center d-flex relative">
                <div className="overlay overlay-bg"></div>
                <Link to="https://youtu.be/S1nUMsPC1-0?si=k5Ib6e3Rj9DVlD5Q">
                  < MdOutlinePlayCircleOutline className="paly-btnIcon" />
                </Link>
              </motion.div>

              <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{
                delay: 0.6,
                y: { type: 'spring', stiffness: 20 },
                opacity: { duration: 0.6 },
                ease: "easeIn",
              }}
                viewport={{ once: false, amount: 0.1 }}

                className="description">
                <h4>Watch this video how they live here</h4>
                <p>
                  Our facility provides a loving & nurturing environment where every animal receives individualized care &
                  attention. We offer spacious play areas, regular medical check-ups, & plenty of socialization to ensure that each animal thrives.
                </p>

              </motion.div>
            </div>
          </div>
        </div>
      </section>


      <Process />
      <Footer />
    </>
  )
}

export default AboutPage
