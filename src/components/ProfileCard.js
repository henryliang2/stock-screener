import React, { useRef } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './../App.css'
import './../styles/ProfileCard.css'

const ProfileCard = (props) => {

  const { companyProfile } = props;

  const cardContainer = useRef(null);

  const shortenedDescription = companyProfile.description.slice(0, 360) + ' ...'

  return (
    <div className='profile-card' ref={ cardContainer }>
      <div className='profile-card__image'>
        <Link to={`/company/${ companyProfile.symbol }`}>
          <img 
            alt={`${companyProfile.name}-logo`} 
            src={ companyProfile.image }
            onLoad={() => { cardContainer.current.classList.add('fade-in')}}
            />
        </Link>
      </div>
      <div className='profile-card__name'>{ companyProfile.companyName }</div>
      <div className='profile-card__exch'>
        { `${companyProfile.exchangeShortName}: ${companyProfile.symbol}` }
      </div>
      <div className='profile-card__desc'>{ shortenedDescription }</div>
    </div>
  );

}

export default ProfileCard;