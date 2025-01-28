import React,{useState,useEffect}  from 'react';
import './Category.css';
import Title from '../Title/Title';
import CategoryCard from './CategoryCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


var settings = {
  infinite: true,
  autoplay: true,
  dots:true,
  speed: 500,
  slidesToScroll: 1,
 
 
  
  responsive: [
    {
      breakpoint: 1920, // Large Monitors Screen size
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 1400, // Desktops and larger tablets
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
};





const Category = () => {
  const[categoryData,setCategoryData]=useState([]);
  const navigate=useNavigate();


  useEffect(()=>{
   const fetchCategories=async()=>{
    try{
      const response= await axios.get('http://127.0.0.1:8000/api/fetchCategory');
      setCategoryData(response.data);
    }
    catch(error){
      console.log('Error fetching category data: ',error);
    }
   };
   fetchCategories();
  },[]);

  const handleCardClick=(category)=>{
  navigate(`/${category.toLowerCase()}`);
  };
  return (
    <>
    
      <div className='handle-title'><Title subTitle="our categories" Title="Look What we offer" /></div>
      <section className="sec-container categories">
      
        <Slider {...settings}>
          {
          categoryData.map((val) => (
              <CategoryCard
                 key={val.id}
                image={`http://127.0.0.1:8000/storage/${val.image}`}
                category={val.name}
                detail={val.detail}
                onClick={()=>handleCardClick(val.name)}
              />

         
          ))}

</Slider>
      </section>
    
    </>
  );
};

export default Category;




