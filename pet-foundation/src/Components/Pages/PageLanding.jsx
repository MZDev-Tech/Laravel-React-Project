import React from 'react'
import './Css/PageLanding.css'
import Shape from "../../Images/dogBg.png"
import { motion } from 'framer-motion'




const PageLanding = (props) => {
  return (
    <>
       <section className="page-banner">
       <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 1, x: { type: 'spring', stiffness: 20 }, opacity: { duration: 1 }, ease: "easeIn", }}
          viewport={{ once: false, amount: 0.1 }}
          className="container">
         <h2>{props.head}</h2>
          <p>{props.parah}</p>
          </motion.div>

          <div className="bg-shape">
          <motion.img initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{delay: 1,
            x: { type: 'spring', stiffness: 20 },
            opacity: { duration: 1 },
            ease: "easeIn",
          }}
            viewport={{ once: false, amount: 0.1 }}
            src={Shape} alt="" />

            </div>
      </section>
    </>
  )
}

export default PageLanding
