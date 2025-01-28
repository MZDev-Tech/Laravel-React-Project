import React, { useState, useContext } from 'react';
import './Css/Form.css'; 
import 'react-toastify/dist/ReactToastify.css';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../ContextAPI/UserContext';
import {jwtDecode} from 'jwt-decode';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const LoginModal = ({ loginModal, setShowLoginModal, setShowRegisterModal }) => {
  const { setUser } = useContext(UserContext);
  const[showPassword,setShowPassword]=useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });


  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/UserLogin', loginData);
      toast.success('Login successful!');
  
      const token = response.data.access_token; // Get the token from response
      sessionStorage.setItem('token', token);
      console.log('user token',token);
  
      // // Decode the token to get user data in laravel jwt token not conatin user data so we dont need jwtdecode we are passing user data from backend 
      // const decodeData = jwtDecode(token);
      // console.log('Decoded user data:', decodeData);

      setUser({
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
    });
      
       // Save user data to context directly from response
    console.log('User data set in context:', {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
    });

      setShowLoginModal(false);
    } catch (error) {
      console.log('catch login error',error);
      toast.error('Login failed. Please check your email and password.');
    }
  };
  

  // function to show signup form
  const handleSignUpClick = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <>
      <div className={`modal-background ${loginModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close-button" onClick={() => setShowLoginModal(false)}>×</span>
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="Input-fields">
              <div className="field1">
                <div className="form-icon">
                  <EmailIcon className="icon1" />
                </div>
                <input type="text" name="email" autocomplete="off" value={loginData.email} onChange={handleInput} placeholder="Email Address" required />
              </div>
              <div className='field1'>
                <div className="form-icon">
                  <LockIcon className="icon1" />
                </div>
                <div className="password-wrapper1" >
                <input type={showPassword ? "text" : "password"} name="password" autocomplete="off" value={loginData.password} onChange={handleInput} placeholder="Password" required />
              <span className="password-toggle" onClick={()=>setShowPassword(!showPassword)}> {showPassword ? <IoEyeOffOutline className="eye-icon"/> : <IoEyeOutline className="eye-icon"/>}</span>
              </div>

              </div>
            </div>
            
            <button type="submit" className="submit-btn">Sign In</button>
          </form>
          <p>Don't have an account? <span onClick={handleSignUpClick}>Sign Up</span></p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
