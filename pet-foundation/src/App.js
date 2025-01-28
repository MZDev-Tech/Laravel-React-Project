import React, { useState, useEffect, lazy, Suspense, useTransition } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './Components/Preloader/Preloader';
import Scroll from './Components/ScrollToTop/Scroll';

// Lazy loading components
const Home = lazy(() => import('./Components/Pages/Home'));
const Success = lazy(() => import('./Components/Pages/Success'));
const Cancel = lazy(() => import('./Components/Pages/Cancel'));
const AllPets = lazy(() => import('./Components/Pages/AllPets'));
const PetDetail = lazy(() => import('./Components/Pages/PetDetail'));
const ContactPage = lazy(() => import('./Components/Pages/ContactPage'));
const AboutPage = lazy(() => import('./Components/Pages/AboutPage'));
const Adopt = lazy(() => import('./Components/Pages/AdoptForm'));
const CategoryBasedPets = lazy(() => import('./Components/Pages/CategoryBasedPets'));
const DogBanner = lazy(() => import('./Components/Banners/DogsBanner'));
const CatBanner = lazy(() => import('./Components/Banners/CatsBanner'));
const RabbitBanner = lazy(() => import('./Components/Banners/RabbitBanner'));
const BirdsBanner = lazy(() => import('./Components/Banners/BirdsBanner'));
const LoginModal = lazy(() => import('./Components/Pages/LoginModal'));
const RegisterModal = lazy(() => import('./Components/Pages/RegisterModal'));
const AnimalShelters = lazy(() => import('./Components/Pages/AnimalShelter'));
const Feedback = lazy(() => import('./Components/Pages/Feedback'));
const AdminLogin = lazy(() => import('./Components/AdminPanel/AdminLogin'));
const AdminMain = lazy(() => import('./Components/AdminPanel/AdminMain'));
const OrderDetails =lazy(()=>import('./Components/Pages/OrderDetails'));
const TrackOrder =lazy(()=>import('./Components/Pages/TrackOrder'));
const UpdateProfile=lazy(()=>import('./Components/Pages/UpdateProfile'));


const App = () => {
  const [loginModal, setShowLoginModal] = useState(false);
  const [registerModal, setShowRegisterModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState(false);
  const[updateProfile,setUpdateProfile]=useState(false);
  const [preloader, setPreloader] = useState(true);

  const [isPending, startTransition] = useTransition();

  // useEffect hook for the preloader
  useEffect(() => {
    const simulateDelay = async () => {
      await new Promise(resolve => setTimeout(resolve, 4000));
      setPreloader(false);
    };

    simulateDelay();
  }, []);

  const handleLoginModal = (show) => {
    startTransition(() => {
      setShowLoginModal(show);
    });
  };

  const handleRegisterModal = (show) => {
    startTransition(() => {
      setShowRegisterModal(show);
    });
  };

  const handleFeedbackData = (data) => {
    startTransition(() => {
      setFeedbackData(data);
    });
  };

  const handleUserProfile = (data) => {
    startTransition(() => {
      setUpdateProfile(data);
    });
  };

  return (
    <Router>
      { preloader ? (
        <Preloader />
      ) : (
        <>
          <Scroll />
          <Suspense fallback={<Preloader />}>
            <Routes>
              {/* Admin routes */}
              <Route path="/admin/admin-login" element={<AdminLogin />} />
              <Route path="/admin/*" element={<AdminMain />} />

              {/* Frontend routes */}
              <Route path="/" element={<Home setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>} />
              <Route path="/success" element={<Success setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>} />
              <Route path="/cancel" element={<Cancel setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>} />
              <Route path="/myAdoptions" element={<OrderDetails setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>}/>
              <Route path="/TrackOrder" element={<TrackOrder setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>}/>
              <Route path="/pets" element={<AllPets setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>} />
              <Route path="/pet/:PetId" element={<PetDetail setFeedbackModal={handleFeedbackData} setUpdateProfile={handleUserProfile} setShowLoginModal={handleLoginModal} />} />
              <Route path="/dogs" element={<CategoryBasedPets banner={DogBanner} PetCategory="Dogs" setUpdateProfile={handleUserProfile} setShowLoginModal={handleLoginModal} />} />
              <Route path="/cats" element={<CategoryBasedPets banner={CatBanner} PetCategory="Cats" setUpdateProfile={handleUserProfile} setShowLoginModal={handleLoginModal} />} />
              <Route path="/birds" element={<CategoryBasedPets banner={BirdsBanner} PetCategory="Birds" setUpdateProfile={handleUserProfile} setShowLoginModal={handleLoginModal} />} />
              <Route path="/rabbits" element={<CategoryBasedPets banner={RabbitBanner} PetCategory="Rabbits" setUpdateProfile={handleUserProfile} setShowLoginModal={handleLoginModal} />} />
              <Route path="/contact" element={<ContactPage setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>} />
              <Route path="/adoptPet" element={<Adopt setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>} />
              <Route path="/about" element={<AboutPage setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>} />
              <Route path="/shelters" element={<AnimalShelters setShowLoginModal={handleLoginModal} setUpdateProfile={handleUserProfile}/>} />
              <Route Path="/updateProfile" element={<UpdateProfile updateProfile={updateProfile} setUpdateProfile={handleUserProfile}/>} />
              <Route path="/feedback" element={<Feedback feedbackModal={feedbackData} setFeedbackModal={handleFeedbackData} setShowLoginModal={handleLoginModal} />} />
              <Route path="/login" element={<LoginModal loginModal={loginModal} setShowLoginModal={handleLoginModal} setShowRegisterModal={handleRegisterModal} />} />
              <Route path="/signup" element={<RegisterModal registerModal={registerModal} setShowRegisterModal={handleRegisterModal} setShowLoginModal={handleLoginModal} />} />
            </Routes>
          </Suspense>

          {/* Modals */}
          {loginModal && <LoginModal loginModal={loginModal} setShowLoginModal={handleLoginModal} setShowRegisterModal={handleRegisterModal} />}
          {registerModal && <RegisterModal registerModal={registerModal} setShowRegisterModal={handleRegisterModal} setShowLoginModal={handleLoginModal} />}
          {feedbackData && <Feedback feedbackModal={feedbackData} setFeedbackModal={handleFeedbackData} />}
          {updateProfile && <UpdateProfile updateProfile={updateProfile} setUpdateProfile={setUpdateProfile} />}
        </>
      )}
    </Router>
  );
};

export default App;
