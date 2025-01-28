import React from 'react';
import dogBan2 from '../../Images/Banners/pupies (1).png';
import './Banner.css';
import {Link} from 'react-router-dom';

const Banner = (props) => {
    return (
        <>
            <section className="sec-banner">
                <div className="all-pets">
                <div className="all-left">
                    <img src={props.image} alt="" />
                </div>
                <div className="all-right">
                    <h2>{props.heading}</h2>
                    <h3>{props.subHeading}</h3>
                    
                <p>{props.detail} </p>
                <button className="Explore" ><Link to="/pets">Explore More</Link></button>
                </div>


                </div>
              
                
            </section>
        </>
    )
}

export default Banner
