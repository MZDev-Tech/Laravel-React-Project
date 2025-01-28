import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';
const Banner = (props) => {
    return (
        <>
            <section className="sec-banner" style={{marginBottom:'0'}}>
                <div className="all-pets" style={{padding: '10px 40px 20px 46px'}}>

                <div className="all-right">
                    <h2 style={{textTransform:'uppercase'}}>{props.heading}</h2>
                    <h3>{props.subHeading}</h3>
                    
                <p style={{width:'90%'}}>{props.detail} </p>
                <button className="Explore" ><Link to="/pets">Explore More</Link></button>
                </div>

                <div className="all-left">
                    <img src={props.image} alt="" />
                </div>
                


                </div>
              
                
            </section>
        </>
    )
}

export default Banner
