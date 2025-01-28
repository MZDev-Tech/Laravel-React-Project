import React from 'react';
import './Sidebar.css';
import Category from './Category';
import Color from './Color';
import Size from './Size';
import Price from './Price';
import Breed from './Breed';

const Sidebar = ({ setFilteredPets, setAlertMessage, showSidebar }) => {
  return (
    <>
      <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
        <div className="side-Title">
          {/* <h2>Sort Pets</h2> */}
        </div>
        <Category setFilteredData={setFilteredPets} />
        <Price setFilteredData={setFilteredPets} setAlertMessage={setAlertMessage}/>
        <Color setFilteredData={setFilteredPets} setAlertMessage={setAlertMessage}/>
        <Breed setFilteredData={setFilteredPets} setAlertMessage={setAlertMessage}/>
        <Size setFilteredData={setFilteredPets} setAlertMessage={setAlertMessage}/>
      </div>
    </>
  );
};

export default Sidebar;
