import React, { useContext, useRef } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { WatchListContext, UserContext } from '../App';
import './../App.css'
import './../styles/ProfileCard.css'

const ProfileCard = (props) => {

  const { watchList, setWatchList } = useContext(WatchListContext);

  const { user } = useContext(UserContext);

  const { companyProfile } = props;

  const cardContainer = useRef(null);

  const removeFromWatchList = (symbol) => {
    let updatedList = [...watchList];
    const idx = updatedList.indexOf(symbol);
    updatedList.splice(idx, 1);
    setWatchList(updatedList);
  }

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
      <div className='profile-card__exch'>
        { `${companyProfile.exchangeShortName}: ${companyProfile.symbol}` }
      </div>
      <Link to={`/company/${ companyProfile.symbol }`}>
        <div className='profile-card__name'>{ companyProfile.companyName }</div>
      </Link>
      <div className='profile-card__industry'>{ companyProfile.industry }</div>
      <div className='profile-card__desc'>{ shortenedDescription }</div>
      { 
        // if user is logged in, show a button to add or remove from collection
        user.userId && (

          !watchList.includes(companyProfile.symbol) 
          
          ? <button className='company-card__button company-card__button--save' onClick={() => {
              setWatchList([...watchList, companyProfile.symbol]);
            }}>+ Save to Collection</button>

          : <button className='company-card__button company-card__button--remove' onClick={() => {
              removeFromWatchList(companyProfile.symbol);
            }}>+ Remove from Collection</button>

        )
      }
    </div>
  );

}

export default ProfileCard;