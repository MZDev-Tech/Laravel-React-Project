import React, { useState } from 'react';
import './Customer.css';
import SpaIcon from '@mui/icons-material/Spa';
import { Person, LocationOn } from '@mui/icons-material';
import { FaQuoteLeft } from "react-icons/fa";



const parahStyle = {
    display: '-webkit-box',
    webkitLineClamp: '2',
    webkitBoxOrient: 'vertical',
    overflow: 'hidden',

}
const CustomerCard = (props) => {
    const [openBox, setOpenBox] = useState(false);

    return (
        <>
            <div className="Customer-card">
                <div className="quote-part">
                    <FaQuoteLeft className="quote-icon" />
                </div>

                <div className="testimonial-part">

                    <h3>Customer Feedback : )</h3>
                    <p className="testi-content" style={openBox ? null : parahStyle}>{props.testimonial}</p>
                    <button className="T-btn" onClick={() => setOpenBox(!openBox)}>{openBox ? 'Read Less' : 'Read More'}</button>
                </div>

                <div className="img-testi">
                    <img src={props.image} alt="" />
                    <div className="customer-data">
                        <h2 className="p-first">{props.name}</h2>
                        <p>{props.location}, Pakistan</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CustomerCard
