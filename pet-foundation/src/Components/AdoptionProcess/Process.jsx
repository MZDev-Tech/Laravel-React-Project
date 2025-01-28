import React from 'react'
import './Process.css'
import { Link } from 'react-router-dom'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
const Process = () => {
    return (
        <>

            <section className="process-area">
                <div className="conatiner">
                    <div className="row d-flex justify-content-center">
                        <div className="menu-content pb-60 col-lg-8">
                            <div className="title text-center">
                                <h1 className="mb-10">Process to adopt a pet</h1>
                                <p>Discover the steps involved in adopting a pet.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row process-row">
                        <div className="col-lg-3 col-md-6 column">
                            <div className="single-process">
                                <FaRegThumbsUp className="process-icon" />
                                <Link to="#"><h4>Pet Selection</h4></Link>
                                <p>Begin by browsing through our available pets to find one that matches your lifestyle.</p>
                            </div>
                        </div>


                        <div className="col-lg-3 col-md-6">
                            <div className="single-process process2">
                                <FaRegUser className="process-icon" />
                                <Link to="#"><h4>Meeting Authority</h4></Link>
                                <p>Meet our adoption counselor to learn about the responsibilities of pet ownership.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 column" >
                            <div className="single-process process2">
                                <FaWpforms className="process-icon" />
                                <Link to="#"><h4>Adoption Form Filling</h4></Link>
                                <p>Complete the adoption application form & provide information about experiences with pets.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 column">
                            <div className="single-process process2">
                                <AutoAwesomeOutlinedIcon className="process-icon last-icon" />
                                <Link hto="#"><h4>Bring to new family</h4></Link>
                                <p>Prepare your home for your new pet & welcome them into your family with love.</p>
                            </div>
                        </div>


                    </div>

                </div>
            </section>


        </>
    )
}

export default Process
