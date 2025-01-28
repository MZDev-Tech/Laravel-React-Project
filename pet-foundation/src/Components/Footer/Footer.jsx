
          import React from 'react';
          import { Link } from 'react-router-dom';
          import './Footer.css';
          import facebook from '../../Images/facebook.png';
          import twitter from '../../Images/twitter.png';
          import insta from '../../Images/insta.png';
          import linkedIn from '../../Images/linkedIn.png';
          import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
          import EmailIcon from '@mui/icons-material/Email';
          import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
          import ChevronRightIcon from '@mui/icons-material/ChevronRight';
          const Footer = () => {
            return (

<>

              <footer className="footer">
              <div className="footer-downPart">

                <div className="Footer_column">
                  <h4>PetFinder</h4>
                  <p className="footer-parah">
                    PetFinder serves as a vital platform connecting animal shelters, and compassionate adopters.
                  </p>
                  <ul className="contact-menu">
                  <li><LocalPhoneIcon className="contact-icon"/> <span>+923425678690</span></li>
                    <li><EmailIcon className="contact-icon"/> <span>info@petfinder.com</span></li>
                    </ul>
                  
                </div>
          
                <div className="Footer_column">
                  <h4>Useful Links</h4>
                  <ul>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/">Home</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/pets">Pets</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/contact">Contact Us</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/about">About Us</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/shelters">Animals Shelters</Link></li>


                  </ul>
                </div>
          
                <div className="Footer_column">
                  <h4>Categories</h4>
                  <ul>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/dogs">Dogs</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/cats">Cats</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/rabbits">Rabbits</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/birds">Birds</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/pets">Other Pets</Link></li>


                  </ul>
                </div>

                <div className="Footer_column">
                  <h4>Account Info</h4>
                  <ul>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/TrackOrder">My Adoptions</Link></li>
                    <li><ChevronRightIcon className="li-tick"/><Link to="/TrackOrder">Track Order</Link></li>

                  </ul>
                </div>
          
                <div className="Footer_column">
                 
                  <div className="social-links">
                    
                    <img src={twitter} alt="" className="social-icon"/>
                    <img src={facebook} alt="" className="social-icon"/>

                    <img src={insta} alt="" className="social-icon"/>

                    <img src={linkedIn} alt="" className="social-icon"/>

                  </div>
                  <h6>Keep up to date with upcoming updates</h6>
        
               <button>
                <PetsOutlinedIcon className="Footerbtn-icon"/>
                <span><Link to="/contact">Send Message</Link></span>
                </button>

                </div>
              </div>
                
              <div className="copyright">
              <h6>Copyright © 2024 All Rights Are Reserved TO PetFinder Team</h6>
            </div>
              </footer>
              
              
              
            </>
            );
          };
          
          export default Footer;
          