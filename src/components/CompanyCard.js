import React, { useContext } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { WatchListContext } from '../App';
import './../App.css';

const CompanyCard = (props) => {

  const { watchList, setWatchList } = useContext(WatchListContext);

  const { companyProfile } = props;

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
  const shortenedDescription = companyProfile.description.slice(0, 560) + ' ...'

  // Formatting Price String
  const price = companyProfile.price.toFixed(2);

  return (
    <React.Fragment>
      <div className='profile'>
        <div className='profile__leftcol'>
          <Link to={`/company/${ companyProfile.symbol }`}>
            <div className='profile__image'>
              <img alt={`${companyProfile.name}-logo`} src={ companyProfile.image }/>
            </div>
          </Link>
          <div className='profile__price'>
            <div className='profile__priceValue'>{ price }&nbsp;</div>
            <div className='profile__priceChange' style={
                {color: change[1] === '+' ? 'green' : 'red'}
              }>{ change }</div>
          </div>
          <div className='profile__symbol'>
            { `${companyProfile.exchangeShortName}: ${ companyProfile.symbol }` }
          </div>
        </div>
        <div className='profile__rightcol'>
          <div className='profile__name'>
            <Link to={`/company/${ companyProfile.symbol }`}>{ companyProfile.companyName }</Link>
          </div>
          <div className='profile__industry'>{ companyProfile.industry }</div>
          <div className='profile__mktCap'>Market Cap: { mktCapStr }</div>
          <div className='profile__desc'>{ shortenedDescription }</div>
          { 
            !watchList.includes(companyProfile.symbol) 
            
            ? <button className='profile__button profile__button--save' onClick={() => {
                setWatchList([...watchList, companyProfile.symbol]);
              }}>+ Save to Collection</button>

            : <button className='profile__button profile__button--remove' onClick={() => {
                removeFromWatchList(companyProfile.symbol);
              }}>+ Remove from Collection</button>
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default CompanyCard;

