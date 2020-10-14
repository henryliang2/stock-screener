import React, { useContext } from 'react';
import { UserContext } from '../App';
import './../styles/Navigation.css'

const Navigation = () => {

  const user = useContext(UserContext);
  
  return (
    <div className='nav'>
      <div className='nav__container'>
        <div className='nav__logo'>StockSurfer</div>
        <div className='nav__links'>
          <div className='nav__user'>
            <div className='nav__userImage'></div>
            <div className='nav__userName'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;