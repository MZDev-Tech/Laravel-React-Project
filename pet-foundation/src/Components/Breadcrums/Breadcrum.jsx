import React from 'react'
import './Breadcrum.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Breadcrum = ({Product}) => {
 
  return (
    <div className="breadcrum">
     <span>Home </span> <ArrowForwardIosIcon className="bread-icon"/> 
     <span>Pets</span> <ArrowForwardIosIcon className="bread-icon"/>
     <span>{Product.category}</span><ArrowForwardIosIcon className="bread-icon"/>
     <span>{Product.pet}</span>
    </div>
  )
}

export default Breadcrum
