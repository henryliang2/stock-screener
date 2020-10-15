import React, { useContext, useState, useRef, useEffect } from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from '../App';
import './../styles/Navigation.css'

const Navigation = () => {

  const { user } = useContext(UserContext);

  const dropdown = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClick = (e) => { 
      if (!dropdown.current.contains(e.target)) {      // inside click     
       setShowDropdown(false)    
      } 
    };

    document.addEventListener('mousedown', handleClick);
  })

  return (
    <div className='nav'>
      <div className='nav__container'>

        <Link to={user.userId ? '/search' : '/'}>
          <div className='nav__logo'>
            StockSurfer
          </div>
        </Link>

        <div className='nav__links' ref={ dropdown }>

          <div className='nav__user-button'
            onClick={() => { if(user.userId) setShowDropdown(!showDropdown) 
          }}>

            <div className='nav__user'>
              { user.userId &&
                <React.Fragment>
                  <div className='nav__user-image'><img src={user.image} alt='user'/></div>
                  <div className='nav__user-name'>{user.displayName}</div>
                </React.Fragment>
              }
            </div>
          </div>

          { showDropdown &&

            <div className='nav__user-options'>
              <Link to='/userprofile'>
                <div className='nav__collection-button'>My Collection</div>
              </Link>
              <a href='http://localhost:3001/auth/logout'>
                <div className='nav__collection-button'>Logout</div>
              </a>
            </div>
          }
          
        </div>
      </div>
    </div>
  );
}

export default Navigation;