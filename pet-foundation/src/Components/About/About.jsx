import React,{useState} from 'react';
import './About.css';
import about2 from '../../Images/Ab3.png';
import aboutSmall from '../../Images/AbBg2.png';
import { motion } from "framer-motion"
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';

const paragraphStyle = {
  
display: '-webkit-box',
webkitLineClamp: '2',
webkitBoxOrient: 'vertical',
overflow: 'hidden',
      
}

const About = () => {

    const[isOpen, setIsOpen]=useState(false);

    return (
        <>
            <section class="sec-container ">
                <div className=" about-part ">

                    <div className='about-left'>
                        <div class="img">
                            <motion.img 
                            initial={{ x : -100, opacity : 0}}
                            whileInView={{x:0,opacity:1}}
                            transition={{
                                delay:1,
                                x: {type:"spring",stiffness:20},
                                opacity:{duration:1},
                                ease:"easeIn",
                                duration:1,
                            }}
                            viewport={{ once: false, amount: 0.1 }}

                            src={about2} alt="about-image" className="img1" />
                            
                            
                            <motion.img
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    delay: 1,
                                    x: { type: "spring", stiffness: 20 },
                                    opacity: { duration: 1 },
                                    ease: "easeIn",
                                    duration: 1,
                                }}
                                viewport={{ once: false, amount: 0.1 }}
                                src={aboutSmall} alt="about-image-small" className="img-small" style={{ display: 'none' }} /> 
                        
                        </div>
                    </div>


                    <div className='about-right'>
                        <motion.div 
                        initial={{x:100,opacity:0}}
                        whileInView={{x:0,opacity:1}}
                        transition={{
                            delay:0.2,
                            x: {type:"spring",stiffness:30},
                            opacity:{duration:1},
                            ease:"easeIn",
                        }}
                        viewport={{ once: false, amount: 0.1 }}
                        
                        class="about-content">
                            <h5>RAISING COMFORT TO THE HIGHEST LEVEL</h5>
                            <h2>Welcome To Pet Finder Foundation</h2>

                            <p>We are passionate advocates dedicated to improving the lives of animals through adoption, rescue,
                                and education. At PetFinder Foundation, we believe that every pet deserves a loving home and
                                a chance for a better future.</p>

                            <ul className="list-about">
                                <li><LibraryAddCheckOutlinedIcon className="check-icon" /> <span>Animal Rescue & Adoption</span></li>
                                <li><LibraryAddCheckOutlinedIcon className="check-icon" /><span>Veterinary Care & Support</span></li>
                                <li>< LibraryAddCheckOutlinedIcon className="check-icon" /><span>Community Outreach</span></li>
                            </ul>

                            <p style={isOpen ? null : paragraphStyle} >Founded with the mission to connect homeless pets with caring individuals and families,
                                we work tirelessly to ensure that abandoned, neglected, and surrendered animals find
                                their way to safe havens and forever homes.
                                Our platform serves as a vital link between animal shelters, foster caregivers, and compassionate adopters,
                                ensuring a seamless process that prioritizes the well-being of every animal.
                            </p>

                            <button type="button" class="btn" onClick={()=>setIsOpen(!isOpen)}>{isOpen ? 'Read Less' : 'Read More'}</button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );

}
export default About;