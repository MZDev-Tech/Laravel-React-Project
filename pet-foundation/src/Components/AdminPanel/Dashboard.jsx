import React, { useState, useEffect } from 'react';
import './CSS/Dashboard.css';
import { FaRegMessage } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import { LuUsers2 } from "react-icons/lu";
import Img2 from '../../Images/dogs/d6.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [data, setData] = useState([]);
    const [totalPets, setTotalPets] = useState(0);
    const [totalContact, setTotalContact] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAdoptions, setTotalAdoptions] = useState(0);
    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const petResponse = await axios.get('http://127.0.0.1:8000/api/totalPets');
                setTotalPets(petResponse.data);
    
                const userResponse = await axios.get('http://127.0.0.1:8000/api/totalUsers');
                setTotalUsers(userResponse.data);
    
                const contactResponse = await axios.get('http://127.0.0.1:8000/api/totalContacts');
                setTotalContact(contactResponse.data);
    
                const adoptionResponse = await axios.get('http://127.0.0.1:8000/api/totalAdoptions');
                console.log('Adoptions:', adoptionResponse.data);
                setTotalAdoptions(adoptionResponse.data);
    
            } catch (err) {
                console.log('Error fetching totals:', err);
            }
        };
        fetchTotals();
    }, []);
    

    useEffect(() => {
        const fetchAdoptions = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/fetchAdoption');
                setData(res.data);
            } catch (err) {
                console.error('Error fetching Animal Adoption:', err);
            }
        }

        fetchAdoptions();
    }, []);

    return (
        <>
            <div className="dashboard">
                <h2>Dashboards</h2>
                <div className="Cards">
                    <Link to="/admin/user" className="val-box">
                        <div className="card-iconbox">
                            <LuUsers2 className="card-icon" />
                        </div>
                        <div>
                            <h3>{totalUsers}</h3>
                            <span>New Users</span>
                        </div>
                    </Link>

                    <Link to="/admin/adoption" className="val-box">
                        <div className="card-iconbox">
                            <CiSquareQuestion className="card-icon" />
                        </div>
                        <div>
                            <h3>{totalAdoptions}</h3>
                            <span>Adoption Requests</span>
                        </div>
                    </Link>

                    <Link to="/admin/contact" className="val-box">
                        <div className="card-iconbox">
                            <FaRegMessage className="card-icon" />
                        </div>
                        <div>
                            <h3>{totalContact}</h3>
                            <span>New Messages</span>
                        </div>
                    </Link>

                    <Link to="/admin/pet" className="val-box">
                        <div className="card-iconbox">
                            <MdPets className="card-icon" />
                        </div>
                        <div>
                            <h3>{totalPets}</h3>
                            <span>Total Pets</span>
                        </div>
                    </Link>
                </div>

                <div className="dashboard-part2">
                    <div className="order-parent">
                        <div className="title-part">
                            <h4>Recent Adoption</h4>
                            <Link to="/admin/adoption">View All</Link>
                        </div>
                        <div className="dash-table">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <th style={{ paddingLeft: '30px' }}>Pet</th>
                                        <th>Customer</th>
                                        <th>Location</th>
                                        <th>Order Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id}>
                                            <td className="order-product">
                                                <img src={`http://127.0.0.1:8000/storage/${item.image}`} alt="" />
                                                <div className="product-data">
                                                    <h5>{item.category}</h5>
                                                    <p>{item.pet}</p>
                                                </div>
                                            </td>
                                            <td>{item.user}</td>
                                            <td>{item.city}</td>
                                            <td>{item.date}</td>
                                            <td><span className="pending-status">{item.delivery_status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
