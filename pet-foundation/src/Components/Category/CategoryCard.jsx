import React from 'react';
import './Category.css';
import SpaIcon from '@mui/icons-material/Spa';



const Category = ({category, image, detail,onClick}) => {
  return (
    <>
        <div className="categoryCard" onClick={onClick}>
        <img src={image} alt=""/>
       <div className="category-data">
       <div className="pet-name"><SpaIcon className="category-icon"/> <h2>Pet {category}</h2></div>
        <p>{detail}
        </p>
    </div>
    
  </div>

      

      
   
  
 

      
    </>
  )
}

export default Category
