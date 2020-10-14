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
            { user.googleId &&
              <React.Fragment>
                <div className='nav__userImage'><img src={user.imageUrl} alt='user'/></div>
                <div className='nav__userName'>{user.name}</div>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;