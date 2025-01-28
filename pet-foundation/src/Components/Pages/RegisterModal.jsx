import React, { useState } from 'react';
import './Css/Form.css';
import 'react-toastify/dist/ReactToastify.css';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import RegisterImg from '../../Images/register.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";



const RegisterModal = ({ registerModal, setShowRegisterModal, setShowLoginModal }) => {
  const [RegisterData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const[showPassword,setShowPassword]=useState(false);

  const[errors,handleErrors]=useState({});

// Simplified validation function

const validateForm=()=>{
const newErrors={};
if(!RegisterData.name){
newErrors.name="UserName is required";
}
if(!RegisterData.email){
  newErrors.email="User Email is required";
}
if(!RegisterData.password){
  newErrors.password="Password is required";
}
if(RegisterData.password && RegisterData.password.length < 6){
  newErrors.password="Password must be at least 6 characters long.";
}

handleErrors(newErrors);
return Object.keys(newErrors).length===0;
};

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  if(!validateForm()){
    return;
  }
    
    try {
      await axios.post('http://127.0.0.1:8000/api/registerUser', RegisterData, {
        headers:{
          'Content-Type':'application/json',
        }
      });
      toast.success("User Register Successfully..")
      setShowRegisterModal(false);
      setShowLoginModal(true); // Show login modal after successful registration
    } catch (error) {
      toast.success("User Registration Failed..")
    }
  };

  // function to show login form
  const handleLoginClick = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
    <div className={`modal-background ${registerModal ? 'show' : ''}`}>
      <div className="register-form">
        <div className="modal-part1">
          <div className="registerModal-data">
            <h2>Get Registered</h2>
            <p>To become part of our community, please sign up using personal information</p>
          </div>
          <img src={RegisterImg} alt="" className="registerBg"/>
        </div>

        <div className="modal-content register-content">
          <span className="close-button" onClick={() => setShowRegisterModal(false)}>×</span>
          <h2>Sign UP</h2>
          <form onSubmit={handleSubmit}>
            <div className="Input-fields">
              <div className="field1">
                <div className="form-icon">
                  <PersonIcon className="icon1" />
                </div>
                <input type="text" name="name" autocomplete="off" value={RegisterData.name} onChange={handleInput} placeholder="Your Name" required />
                {errors.name && <span className="error">{errors.name}</span>}

              </div>

              <div className="field1">
                <div className="form-icon">
                  <EmailIcon className="icon1" />
                </div>
                <input type="email" name="email" autocomplete="off" value={RegisterData.email} onChange={handleInput} placeholder="Email Address" required />
                {errors.email && <span className="error">{errors.email}</span>}

              </div>

              <div className="field1">
                <div className="form-icon">
                  <LockIcon className="icon1" />
                </div>
                <div className="password-wrapper1">
                <input type={showPassword ? "text" : "password"} name="password" autocomplete="off" value={RegisterData.password} onChange={handleInput} placeholder="Password" required />
                <span className="password-toggle" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <IoEyeOffOutline className="eye-icon"/> : <IoEyeOutline className="eye-icon"/>}</span>
                {errors.password && <span className="error">{errors.password}</span>}
</div>
              </div>
            </div>
            <p>Already have an account? <span onClick={handleLoginClick}>Login</span></p>
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterModal;
