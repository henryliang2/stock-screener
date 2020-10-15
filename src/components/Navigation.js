import React, { useContext } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
            { user.googleId &&
              <React.Fragment>
                <Link to='/userprofile'><div className='nav__collection-button'>My Collection</div></Link>
                <div className='nav__user-image'><img src={user.imageUrl} alt='user'/></div>
                <div className='nav__user-name'>{user.name}</div>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;