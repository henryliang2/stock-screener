import React, { useContext } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ProfileContext } from './../App'
import './../App.css';

const Profiles = (props) => {

  const profiles = useContext(ProfileContext);

  return (
    <div className='profile__container'>
        { 
          profiles.map((profile, i) => {
            if (!profile.description || !profile.industry) return null;

            let change = profile.changes.toFixed(2);
            if(Math.sign(change) === 1 || Math.sign(change) === 0) change = `(+${change.toString()}%)`;
            else change = `(${change.toString()}%)`;

            const mktCapStrLength = profile.mktCap.toString().length;
            let mktCapStr = '';
            if (mktCapStrLength >= 13) mktCapStr = (profile.mktCap / 1000000000000).toFixed(2) + ' Trillion'
            else if (mktCapStrLength >= 10) mktCapStr = (profile.mktCap / 1000000000).toFixed(2) + ' Billion'
            else if (mktCapStrLength >= 7) mktCapStr = (profile.mktCap / 1000000).toFixed(2) + ' Million'
            else mktCapStr = profile.mktCap.toString();

            const shortenedDescription = profile.description.slice(0, 420) + ' ...'

            return (
              <React.Fragment key={i}>
                <div className='profile'>
                  <div className='profile__leftcol'>
                    <Link to={`/company/${ profile.symbol }`}>
                      <div className='profile__image'>
                        <img alt={`${profile.name}-logo`} src={ profile.image }/>
                      </div>
                    </Link>
                    <div className='profile__price'>
                      <div className='profile__priceValue'>{ profile.price }&nbsp;</div>
                      <div className='profile__priceChange' style={
                          {color: change[1] === '+' ? 'green' : 'red'}
                        }>{ change }</div>
                    </div>
                    <div className='profile__symbol'>
                      { `${profile.exchangeShortName}: ${ profile.symbol }` }
                    </div>
                  </div>
                  <div className='profile__rightcol'>
                    <div className='profile__name'>
                      <Link to={`/company/${ profile.symbol }`}>{ profile.companyName }</Link>
                    </div>
                    <div className='profile__industry'>{ profile.industry }</div>
                    <div className='profile__mktCap'>Market Cap: { mktCapStr }</div>
                    <div className='profile__desc'>{ shortenedDescription }</div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        }

        <button onClick={ () => { 
          props.runApiCall(props.initialValue + 20);
          props.setInitialValue(props.initialValue + 20);
        }}>Next Page</button>

      </div>
  );
}

export default Profiles;