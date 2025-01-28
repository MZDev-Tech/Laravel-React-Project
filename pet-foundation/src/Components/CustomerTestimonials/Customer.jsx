import React,{useState,useEffect} from 'react';
import './Customer.css';
import Title from '../Title/Title';
import CustomerCard from './CustomerCard';
import TestimonialData from '../Database/TestimonialData';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';

var settings = {
  infinite: true,
  autoplay: true,
  slidesToScroll: 1,
  speed: 500,

  responsive: [
    {
      breakpoint: 1920, // Large Monitors Screen size
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 1400,   //Laptop screen
      settings: {
        slidesToShow: 3,
      }
    },

    {
      breakpoint: 920, // Tablets
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 600, // Mobiles and smaller tablets
      settings: {
        slidesToShow: 1,
      }
    }

  ]

}

const Customer = () => {

  //fetching data from backend database
  const[feedback,setFeedback]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get('http://127.0.0.1:8000/api/fetchFeedback');
        setFeedback(response.data);
      }catch(error){
        console.log('Error while Fetching Data: ',error);
      }
    };
    fetchData();
  })
  return (

    <>
      <Title subTitle="Testimonials" Title="See What Customers Say" />

      <section className="sec-container">
        <Slider {...settings}>
          {
            feedback.map((val1) => {
              return (
                <CustomerCard
                  key={val1.id}
                  name={val1.name}
                  location={val1.location}
                  image={`http://127.0.0.1:8000/storage/${val1.image}`}
                  testimonial={val1.detail}
                />
              );
            })
          }
        </Slider>
      </section>

    </>
  )
}

export default Customer

