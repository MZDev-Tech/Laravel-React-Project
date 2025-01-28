// AdminMain.jsx
import React,{useState,useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Category from './ViewCategory';
import Pets from './ViewPets';
import Contact from './ViewContact';
import User from './ViewUser';
import Feedback from './ViewFeedback';
import Shelters from './ViewShelters'
import Adoption from './ViewAdoption'
import ShowAdoption from './ShowAdoptionDetail'
import ShowShelter from './ShowShelter'
import ShowPets from './ShowPets'
import ShowFeedback from './ShowFeedback'
import ViewAdmin from './ViewAdmin'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const MainAdmin = () => {
  const [sidebarVisible, setSidebarVisible]=useState(false);

  const handleToggleSidebar=()=>{
    setSidebarVisible(!sidebarVisible);
  }

  const navigate=useNavigate();
  useEffect(()=>{
   const token =sessionStorage.getItem('token');
   if(!token){
    navigate('/admin/admin-login');
    toast.error("Unable to access token not found ");
   }
  },[navigate]);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar}/>
      <Sidebar sidebarVisible={sidebarVisible}/>
      <main flex="1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adminProfile" element={<ViewAdmin />} />
          <Route path="/category" element={<Category />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/showShelter/:id" element={<ShowShelter />} />
          <Route path="/showPets/:id" element={<ShowPets />} />
          <Route path="/showFeedback/:id" element={<ShowFeedback />} />
          <Route path="/showAdoption/:id" element={<ShowAdoption />} />

        </Routes>
      </main>
    </>
  );
};

export default MainAdmin;
