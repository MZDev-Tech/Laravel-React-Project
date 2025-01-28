import React, { useState, useEffect } from 'react';
import './Nav1.css';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import PersonIcon from '@mui/icons-material/Person'; 
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';

const Navbar = ({ setShowLoginModal,setUpdateProfile}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const[showSidebar,setShowSidebar]=useState(false);
  const [menu, setMenu] = useState("Home");
  const [sticky, setSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[dropdownShow, setDropdownShow]=useState(false);

//function to show sidebar in small screens 
const handleSidebar=()=>{
setShowSidebar(true);
}
//function to show dropdown 

const toggleDropdownShow=()=>{
  setDropdownShow(!dropdownShow);
};
  // useEffect to check login status on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('token'); // You can use sessionStorage as well
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn(false); // Update state
    navigate('/'); 
  };

  // useEffect to add scroll listener and update sticky state
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
      setDropdownShow(false); // Hide dropdown when scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine if we are on the home page
  const isHomePage = location.pathname === '/';

  return (
    <nav className={`sec-container header ${isHomePage ? (sticky ? 'dark-nav' : '') : 'dark-nav'}`}>
      <div className="logo">
        <PetsOutlinedIcon className="logo-icon" /> Pet<span>Finder.</span>
      </div>

<div className={`navbar-menu ${showSidebar ? 'show':''}`}>
<ClearIcon className="cross-btn" onClick={() => setShowSidebar(false)}/>

      <ul>
      
        <li onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => setMenu("Pets")} className={`dropdown-li ${menu === "Pets" ? "active" : ""}`}>
          <Link to="/pets">Pets</Link>
          <ul className="dropdown">
            <li className="dropdown-link"><Link to="/dogs">Dogs</Link></li>
            <li className="dropdown-link"><Link to="/cats">Cats</Link></li>
            <li className="dropdown-link"><Link to="/birds">Birds</Link></li>
            <li className="dropdown-link"><Link to="/rabbits">Rabbits</Link></li>
            <li className="dropdown-link last-dropdown"><Link to="/pets">Other Animals</Link></li>
          </ul>
        </li>
        <li onClick={() => setMenu("About Us")} className={menu === "About Us" ? "active" : ""}>
          <Link to="/about">About Us</Link>
        </li>
        <li onClick={() => setMenu("Contact")} className={menu === "Contact" ? "active" : ""}>
          <Link to="/contact">Contact</Link>
        </li>
        <li onClick={() => setMenu("Testimonials")} className={menu === "Testimonials" ? "active" : ""}>
          <Link to="/shelters">Animal Shelters</Link>
        </li>

        {/* Conditionally render the sign-in button or logout button based on login status */}


        {!isLoggedIn ? (
    <li className='last-li'>
      <div className="main-btn" onClick={() => setShowLoginModal(true)}>Sign In</div>
    </li>
  ) : (

    <li className="profile-li">
      <div className="user-profile">
        <div className="person-profile">
          <h2 className="profile-text" onClick={toggleDropdownShow}>My Profile</h2>
          <PersonIcon className='person-icon' />
        </div>

        <ArrowDropDownIcon className="drop-icon" onClick={toggleDropdownShow} />
        <ul className={`dropdown ${dropdownShow ? 'visible':' '}`}>
          <li className="dropdown-link"><Link to="/TrackOrder">Track Order</Link></li>
          {/* <li className="dropdown-link" onClick={()=>setUpdateProfile(true)}>User Profile</li> */}

          <li className="dropdown-link last-dropdown" onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </li>
  )}
      </ul>
      </div>

        <MenuIcon className="menu-icon" onClick={handleSidebar} />
    </nav>
  );
}

export default Navbar;
