import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from 'react-icons/md';
import './CSS/MainPage.css';



const Contact = () => {

  //usesate hook to get data fron database 
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/fetchContact');
      setData(res.data);
    } catch (err) {
      console.error('Error while fetching Data:', err);
    }
  };

 

  return (
      <>
        <section className="admin-page">
          <div className="page-top">
            <h2>New Messages</h2>
          </div>

        
          <div className="table-part">
            <h2>Contact Detail</h2>
            <div className="table-section">
              <table width="100%" className="table ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>phone</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (

                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td >{item.email}</td>
                      <td >{item.phone}</td>
                      <td >{item.message}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </>

    
  );
};

export default Contact
