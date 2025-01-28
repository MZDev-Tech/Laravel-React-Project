import React, { useState, useEffect } from 'react';
import './Css/PetDetail.css'; 
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Breadcrum from '../Breadcrums/Breadcrum';
import { LocationOn } from '@mui/icons-material';
import Petlog from '../../Images/pet-logo3.png';
import Petlog1 from '../../Images/pet-log3.png';
import Title from '../Title/Title';
import Process from '../AdoptionProcess/Process';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer'; 
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Preloader from '../Preloader/Preloader'



const PetDetail = ({ setFeedbackModal,setShowLoginModal,setUpdateProfile  }) => {
  const { PetId } = useParams();
  const [pet, setPet] = useState(null);
  const [relatedPets, setRelatedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //check if user is login then redirect to adoption form else to login form
const navigate=useNavigate();

const handleAdoptClick = async () => {
  const token = sessionStorage.getItem('token');
  console.log('Token being sent:', token);

  if (!token) {
    setShowLoginModal(true);
    return toast.error('Please log in before adopting a pet.');
  }
  
  try {
    const { data } = await axios.post('http://127.0.0.1:8000/api/verifyUserToken', { token });
    if (data.isValid) {
      navigate('/adoptPet', { state: { pet } });
    } else {
      sessionStorage.removeItem('token');
      setShowLoginModal(true);
      toast.error('Session expired. Please log in again.');
    }
  } catch (err) {
    console.error('Token verification failed:', err);
    setShowLoginModal(true);
    toast.error('Please log in before adopting a pet.');
  }
};


  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        // Fetch pet details
        const petResponse = await axios.get(`http://127.0.0.1:8000/api/PetById/${PetId}`);
        setPet(petResponse.data);

        // Fetch related pets
        const relatedPetsResponse = await axios.get('http://127.0.0.1:8000/api/fetchPet');
        const filteredRelatedPets = relatedPetsResponse.data.filter(
          (item) => item.category === petResponse.data.category && item.id !== parseInt(PetId)
        );
        setRelatedPets(filteredRelatedPets);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching pet details:', err);
        setError('Failed to load pet details');
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [PetId]);

  if (loading) return < Preloader />;
  if (error) return <p>{error}</p>;

  if (!pet) return <p>No pet data available</p>;

  return (
    <>
    <Navbar setUpdateProfile={setUpdateProfile} setShowLoginModal={setShowLoginModal}/>
      <section className="sec">
        <div className="details-sec">
          <div className="pet-details">
            <div className="part-left">
              <img src={`http://127.0.0.1:8000/storage/${pet.image}`} alt={pet.pet} /> {/* Adjust the URL as necessary */}
              <div className="image-downPart">
                <div className="downPart1">
                  <img src={Petlog} alt="" />
                  <p>100% health guarantee for pets</p>
                </div>
                <div className="downPart1">
                  <img src={Petlog1} alt="" />
                  <p>100% guarantee of pet identification</p>
                </div>
              </div>
            </div>
            <div className="detail-part-right">
              <Breadcrum Product={pet} />
              <div className="top-heading">
                <h2>{pet.pet}</h2>
                <h4>
                  <span><LocationOn className="loc-icon" /></span>{pet.location}
                </h4>
              </div>
              <h3>RS {pet.price}/-</h3>

              <div className="detail-btns">
                <button className="btn1 d-btn" onClick={() => setFeedbackModal(true)}>Give Feedback</button>
                <button className="btn2 d-btn" onClick={handleAdoptClick}>Adopt Pet</button>
              </div>

              <ul className="data-pet">
                <li className="line1">
                  <p className="parah1">Gender</p>
                  <p className="parah2">: {pet.gender}</p>
                </li>
                <li className="line1">
                  <p className="parah1">Age</p>
                  <p className="parah2">: {pet.age}</p>
                </li>
                <li className="line1">
                  <p className="parah1">Size</p>
                  <p className="parah2">: {pet.size}</p>
                </li>
                <li className="line1">
                  <p className="parah1">Breed</p>
                  <p className="parah2">: {pet.breed} & {pet.easeOfTraining} level trained</p>
                </li>
                <li className="line1">
                  <p className="parah1">Color</p>
                  <p className="parah2">: {pet.color}</p>
                </li>
                <li className="line1">
                  <p className="parah1">Health</p>
                  <p className="parah2">: {pet.healthDetails} With {pet.energyLevel} energy level</p>
                </li>
                <li className="line1">
                  <p className="parah1">Vendor</p>
                  <p className="parah2">: {pet.vendor}</p>
                </li>
                <li className="line1">
                  <p className="parah1">Publish Date</p>
                  <p className="parah2">: {pet.publish_date}</p>
                </li>
                <li className="line1">
                  <p className="parah1">Status</p>
                  <p className="parah2">: {pet.status}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="detail-parah">
            <h4>More About Pet</h4>
            <p className="parah-data">{pet.detail}</p>
          </div>
        </div>

        {/* Related Products Section */}
        <div className='part2-related'>
          <Title subTitle="What's New" Title="See Related Pets" />

          <div className="related-products">
            {relatedPets.map((relatedPet) => (
              <div className="related-products-list" key={relatedPet.id}>
                <Link to={`/pet/${relatedPet.id}`}>
                  <img src={`http://127.0.0.1:8000/storage/${relatedPet.image}`} alt={relatedPet.pet} />
                  <h3>{relatedPet.pet}</h3>
                  <div className='related-pet-data'>
                    <p>Gene:<span>{relatedPet.gender}</span></p>
                    <p>Age:<span>{relatedPet.age}</span></p>
                  </div>
                  <p className="price">Rs {relatedPet.price}/-</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <Footer />
    </>
  );
};

export default PetDetail;
