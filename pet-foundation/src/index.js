import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import UserContextProvider from './Components/ContextAPI/UserContext'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <App/>
    <ToastContainer bodyClassName="toastBody"/>

    </UserContextProvider>

    );



