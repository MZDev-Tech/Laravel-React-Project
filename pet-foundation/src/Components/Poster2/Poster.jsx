import React from 'react'
import './Poster.css';
import img1 from '../../Images/dogs/dd7.jpg'
import catGif from '../../Images/footer-img.gif'

const Poster = () => {
    return (
        <>
            <section className='sec-container2'>
                <div className='poster'>
                    <img src={catGif} alt="" className='giff'/>
                <div className="poster-part">

                <img src={img1} alt="" />
                <div className="poster-data">
                <p className="main-parag">“If you can help an animal, do it, in any way that you can –<span > each one worth your efforts.</span>”</p>
                <p>&nbsp;</p>
                <button className='poster-para2'>Make an adopation</button>
                </div>
                </div>
                </div>
            </section>
        </>
    )
}

export default Poster
