import React, { useState, useContext, useEffect } from 'react';
import './Css/AdoptForm.css'; 
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import { UserContext } from '../ContextAPI/UserContext';

import {toast} from 'react-toastify'

const AdoptForm = ({ setShowLoginModal,setUpdateProfile }) => {
  const [alert, setAlert] = useState(false);
  const location = useLocation();
  const pet = location.state?.pet;

  const { user } = useContext(UserContext); 
  console.log('user data from context',user);
  useEffect(() => {
    if (user) {
      setAdopationForm(prevState => ({
        ...prevState,
        user: user.name,
        email: user.email,
      }));
    }
  }, [user]);
  
  const [adopationForm, setAdopationForm] = useState({
    pet: pet?.pet || '',
    category: pet?.category || '',
    fee: pet?.price || '',
    image: pet?.image ? `http://127.0.0.1:8000/storage/${pet.image}` : '', 
    user: user ? user.name : '',
    email: user ? user.email : '',
    contact: '',
    city: '',
    shippingAddress: '',
    previousPet: '',
    experience: '',
    house: '',
    petSpace: '',
    payment_id: '',
    payment_amount: pet?.price || '',
    payment_currency: 'Pkr',
    delivery_status: 'Pending',
    user_id: user ? user.id : '',
  });




  // Handle input field changes
  const handleAdopationInput = (event) => {
    const { name, value } = event.target;
    setAdopationForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

 
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
      await makePayment(); 
    
  };

  // Stripe Payment Logic
  const makePayment = async () => {
    const stripe = await loadStripe('pk_test_51PffNyA6tNiR1N27rHj7UwyOwk27oYTHTiZUonjP9FPt8E5d25ADFxdrW2sqPxVSA7zXizJr5X30cFCZeHQCDUrq00ODHzKKEq');
    const body = { adoptionData: adopationForm };
    const headers = { "Content-Type": "application/json" };

    try {
        const response = await fetch("http://127.0.0.1:8000/api/paymentCheckout", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response:', errorText);
            throw new Error('Failed to create checkout session');
        }

        const session = await response.json();
        console.log('Session data:', session); // Log session data for debugging

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            console.log(result.error.message);
            alert("Payment failed: " + result.error.message);
        }
    } catch (error) {
        console.error("Error during payment", error);
        toast.error("Payment processing failed, please try again.");
    }
};



 return (
    <>
      <Navbar setShowLoginModal={setShowLoginModal} setUpdateProfile={setUpdateProfile} />
      <section className="adopt sec-container">
        {alert && (
          <div className="alert alert-success alert-dismissible p-4" style={{ fontSize: '1.6rem' }} role="alert">
            <strong>Success!</strong> Adoption Request has been sent.
            <button
              type="button"
              className="close"
              style={{ fontSize: '2rem' }}
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setAlert(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="adopt-form1">
          <h2 className="form-heading">Make A Pet Adoption</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-data2">
              <div className="part-left">
                <div className="pet-details2">
                  <img src={pet?.image ? `http://127.0.0.1:8000/storage/${pet.image}` : 'null'} alt="Pet" className="img-fluid" />
                  <div className="petData2">
                    <h4 className="pet-name">{pet?.pet || 'Pet Name'}</h4>
                    <p className="pet-category">{pet?.category || 'Pet Category'} Category</p>
                    <p>Adoption Fee {pet?.price || '0'} Pkr</p>
                  </div>
                </div>
              </div>

              <div className="part-right">
                <div className="adopation-fields">
                  {/* Input Fields */}
                  <div className="adopation-input form-group">
                    <label>User</label>
                    <input
                      type="text"
                      name="user"
                      className="form-control"
                      placeholder="UserName"
                      value={adopationForm.user || ''} 
                      onChange={handleAdopationInput}
                     required
                    />
                    
                  </div>

                  <div className="adopation-input form-group">
                    <label>Email ID</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email ID"
                      value={adopationForm.email || ''} 
                      onChange={handleAdopationInput}
                      required
                    />
                  </div>


                  <div className="adopation-input form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="contact"
                      className="form-control"
                      placeholder="+92XXXXXXXXX"
                      value={adopationForm.contact}
                      onChange={handleAdopationInput}
                      required
                    />
                  </div>

                  <div className="adopation-input form-group">
                    <label>Shippiment City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="Enter City / State"
                      value={adopationForm.city}
                      onChange={handleAdopationInput}
                      required
                    />
                  </div>

                  <div className="adopation-input form-group">
                    <label>Shipping Address</label>
                    <input
                      type="text"
                      name="shippingAddress"
                      className="form-control"
                      placeholder="Complete Shipping Address"
                      value={adopationForm.shippingAddress}
                      onChange={handleAdopationInput}
                      required
                    />
                  </div>

                  <div className="adopation-input form-group">
                    <label>Before Have Pet?</label>
                    <input
                      type="text"
                      name="previousPet"
                      className="form-control"
                      placeholder="Yes / No"
                      value={adopationForm.previousPet}
                      onChange={handleAdopationInput}
                    />
                  </div>

                  <div className="adopation-input form-group">
                    <label>Experience With Previous Pet?</label>
                    <textarea
                      name="experience"
                      className="form-control"
                      placeholder="Experience"
                      value={adopationForm.experience}
                      rows="1"
                      onChange={handleAdopationInput}
                    />
                  </div>

                  <div className="adopation-input form-group">
                    <label>House Rented or Own?</label>
                    <textarea
                      name="house"
                      className="form-control"
                      placeholder="About House"
                      value={adopationForm.house}
                      rows="1"
                      onChange={handleAdopationInput}
                    />
                  </div>

                  <div className="adopation-input form-group">
                    <label>Have Space for Pet?</label>
                    <input
                      type="text"
                      name="petSpace"
                      className="form-control"
                      placeholder="Yes / No"
                      value={adopationForm.petSpace}
                      onChange={handleAdopationInput}
                    />
                  </div>

                 

                  <button type="submit" className="adopt-btn2" >
                    Send Payment
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdoptForm;
