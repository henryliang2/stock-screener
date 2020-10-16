import React, { useContext, useRef } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext, WatchListContext } from '../App';
import './../styles/CompanyCard.css';
import './../App.css';

const CompanyCard = (props) => {

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

  // return blank card if no description or industry
  if (!companyProfile.description || !companyProfile.industry) return null;

  // Formatting Price Change Percentage String
  let change = companyProfile.changes.toFixed(2);
  if(Math.sign(change) === 1 || Math.sign(change) === 0) change = `(+${change.toString()}%)`;
  else change = `(${change.toString()}%)`;

  // Formatting Market Cap String
  const mktCapStrLength = companyProfile.mktCap.toString().length;
  let mktCapStr = '';
  if (mktCapStrLength >= 13) mktCapStr = (companyProfile.mktCap / 1000000000000).toFixed(2) + ' Trillion'
  else if (mktCapStrLength >= 10) mktCapStr = (companyProfile.mktCap / 1000000000).toFixed(2) + ' Billion'
  else if (mktCapStrLength >= 7) mktCapStr = (companyProfile.mktCap / 1000000).toFixed(2) + ' Million'
  else mktCapStr = companyProfile.mktCap.toString();

  // Formatting Description String
  const shortenedDescription = companyProfile.description.slice(0, 360) + ' ...'

  // Formatting Price String
  const price = companyProfile.price.toFixed(2);

  return (
    <React.Fragment>
      <div className='company-card' ref={ cardContainer }>
        <div className='company-card__leftcol'>
          <Link to={`/company/${ companyProfile.symbol }`}>
            <div className='company-card__image'>
              <img 
                alt={`${companyProfile.name}-logo`} 
                src={ companyProfile.image }
                onLoad={() => { cardContainer.current.classList.add('fade-in')}}
                />
            </div>
          </Link>
          <div className='company-card__price'>
            <div className='company-card__priceValue'>{ price }&nbsp;</div>
            <div className='company-card__priceChange' style={
                {color: change[1] === '+' ? 'green' : 'red'}
              }>{ change }</div>
          </div>
          <div className='company-card__symbol'>
            { `${companyProfile.exchangeShortName}: ${ companyProfile.symbol }` }
          </div>
        </div>
        <div className='company-card__rightcol'>
          <div className='company-card__name'>
            <Link to={`/company/${ companyProfile.symbol }`}>{ companyProfile.companyName }</Link>
          </div>
          <div className='company-card__industry'>{ companyProfile.industry }</div>
          <div className='company-card__mktCap'>Market Cap: { mktCapStr }</div>
          <div className='company-card__desc'>{ shortenedDescription }</div>
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
      </div>
    </React.Fragment>
  );
}

export default CompanyCard;

