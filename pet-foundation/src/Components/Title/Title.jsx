import React from 'react';
import './Title.css';
import {motion} from "framer-motion"

const Title = (props) => {
  return (
    <>
      <motion.div initial={{y:100,opacity:0}} whileInView={{y:0,opacity:1}}  transition={{ delay:0.2, y: {type:"spring",stiffness:40}, opacity:{duration:1}, ease:"easeIn",}}
      viewport={{once:false,amount:0.2}} className='title'>


        <p>{props.subTitle}</p>
        <h2>{props.Title}</h2>

      </motion.div>
    </>
  )
}

export default Title
