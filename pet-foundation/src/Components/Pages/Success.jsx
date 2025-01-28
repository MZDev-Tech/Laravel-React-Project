import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Css/SuccessPage.css';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();  
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [adoptionData, setAdoptionData] = useState(null); // Store specific adoption data
  const[loading,setLoading]=useState(true);

  useEffect(() => {
    const saveAdoptionData = async () => {
      try {

        setLoading(true);

        // Fetch the session details from Stripe
        const { data: session } = await axios.get(`http://127.0.0.1:8000/api/get-session/${sessionId}`);

        
        // Ensure that adoptionData exists in session.metadata
        if (session && session.metadata && session.metadata.adoptionData) {
          const adoptionData = JSON.parse(session.metadata.adoptionData);

          // Save the adoption form data with the payment ID
          const response = await axios.post('http://127.0.0.1:8000/api/addAdoption', {
            adoptionData,
            payment_id: session.payment_intent,
            payment_amount: session.amount_total / 100, // Convert back to PKR
          });

          if (response.status === 200) {
            toast.success('Adoption request sent successfully');
            console.log(response.data);
            console.log('order number from response',response.data.orderNumber);
            // Fetch the specific adoption record for the user
            fetchAdoptionRecord(response.data.orderNumber); 
          }
        } else {
          toast.error('Unable to send adoption request...');
        }
      } catch (error) {
        console.error('Error saving adoption data', error);
      }finally{
        setLoading(false);
      }
    };

    if (sessionId) {
      saveAdoptionData();
    }
  }, [sessionId]);

  // Fetch specific adoption record based on order number
  const fetchAdoptionRecord = async (orderNumber) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/fetchAdoptionByOrder/${orderNumber}`); 
      console.log('Adoption data fetch successful for order:', orderNumber);
      setAdoptionData(response.data); 
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Go Back button click and remove sessionId
  const handleGoBack = () => {
    // Clear the session_id from the URL
    sessionStorage.removeItem('token');
    navigate('/pets');  

  };

  return (

    <section className="sec-container success-page">
      <div className="success-data">
      <h2>Thank You For making Pet Adoption</h2>
   { loading ? (
    <p className="thank-mesg">Plz Wait, Adoption request is in progress...</p> ): adoptionData ? ( 
      // Check if specific adoption data exists
        <div>
          <p className="thank-mesg">Hi {adoptionData.user}, Your payment sent successfully</p>
          <p>Your order no. is {adoptionData.orderNumber}</p>
        </div>
      ) : (
        <p>Unable to retrieve adoption data.</p>
      )}
    <button type="button" className="btn btn-info m-3 btn-back" onClick={handleGoBack}>Go Back</button>
    </div>
        
    </section>
  );
}


export default Success;
