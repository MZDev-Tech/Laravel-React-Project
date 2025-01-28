import React,{useState,useEffect} from 'react'
import './CSS/MainPage.css';
import './CSS/DetailPage.css';
import about2 from '../../Images/Ab3.png';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';


const ShowShelter = () => {
 const{id}=useParams();
  const[singleData,setData]=useState([]);


  useEffect(()=>{
 const fetchSingleShelter=async()=>{
  try{
    const response=await axios.get(`http://127.0.0.1:8000/api/singleShelter/${id}`);
  setData(response.data);
  toast.success("Successfully showing single shelter details");
}catch (err) {
  toast.error("Error while fetching single shelter data");
  console.error('Error fetching Animal Shelters:', err);
}

 };

if (id) {
 fetchSingleShelter();
}
  }, [id]);


  return (
    <>

<section className="admin-page">
          <div className="page-top">
            <h2>Single Shelter Detail</h2>
           </div>
        

           { singleData ? (
             <>
          <div className="detail-part">
           <div className="row">
         
           
             <div className="left-inside col-12" >
             <img src={`http://127.0.0.1:8000/storage/${singleData.image}`} style={{borderRadius:0,height:'150px',width:'210px',border:'none'}} alt="" />
             <button type="button" className="btn2"><Link to="/admin/shelters">Go Back</Link></button>

             </div>


            <div className='left-view  col-12'>                           
            <div className="info-item">
              <p className="label">Name:</p>
              <p className="value">{singleData.name}</p>
            </div>
            <div className="info-item">
              <p className="label">Location:</p>
              <p className="value">{singleData.location}</p>
            </div>
            <div className="info-item">
              <p className="label">Link:</p>
              <p className="value link" style={{color:'blue',cursor:'pointer'}}>{singleData.link}</p>
            </div>
            <div className="info-item detail-parah">
              <p className="label">Description:</p>
              <p className="value ">{singleData.detail}</p>
            </div>
               
                </div>
           </div>
           
          </div>
          </>
    ) : (
      <p>Loading...</p>
    )}
  </section>
  </>
);
};

export default ShowShelter
