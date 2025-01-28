import React, { useState, useEffect } from 'react';
import './CSS/Header.css';
import img1 from '../../Images/user-profile.jpg';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ handleToggleSidebar }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handleLogout = async() => {
    const token=sessionStorage.getItem('token');
    try{
      await axios.post('http://127.0.0.1:8000/api/logout',{}, {
        headers:{
          Authorization:`Bearer ${token}`,
        },
        
      });
    sessionStorage.removeItem('token'); //remove token
    toast.success("Logged out successfully");
    navigate('/admin/admin-login');  // Redirect to login page
    }catch(err){
      console.log('Error during logout',err);
    }
   
    
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/fetchAdmin',{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
        setAdminData(response.data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.log(err);
      }
    }

    fetchAdminData();
  }, []);

  return (
    <div className="header-sec">
      <div className="header-leftpart">
        <div className="admin-logo">
          <PetsOutlinedIcon className="head-icon" /> Pet<span>Finder</span>
        </div>
        <IoMenuOutline className='menu-icon' onClick={handleToggleSidebar} />
      </div>
      <div className="admin">
        <img src={`http://127.0.0.1:8000/storage/${adminData.image}`} alt="admin profile" />
        <div className="profile-data">
          {/* Check if data is loading */}
          <h5>{ isLoading ? 'Loading...' : adminData.name || 'No Name Available'}</h5>
          <span>Admin</span>
        </div>
        <ArrowDropDownIcon className="admin-icon" onClick={toggleDropdown} />
        <ul className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
          <li className="dropdown-link"><Link to="/admin/adminProfile">Profile</Link></li>
          <li className="dropdown-link" onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
