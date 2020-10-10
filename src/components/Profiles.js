import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './../App.css'

const Profiles = (props) => {

  return (
    <div className='profile__container'>
        { 
          props.profiles.map((profile, i) => {
            if (!profile.description || !profile.industry) return null;

            const shortenedDescription = profile.description.slice(0, 380) + ' ...'
            return (
              <React.Fragment key={i}>
                <div className='profile'>
                  <div className='profile__image'>
                    <img alt={`${profile.name}-logo`} src={ profile.image }/>
                  </div>
                  <div className='profile__header'>
                    <div className='profile__name'>{ profile.companyName }</div>
                    <div className='profile__industry'>{ profile.industry }</div>
                    <div className='profile__symbol'>{ `${profile.exchangeShortName}: ${ profile.symbol }` }</div>
                  </div>
                  <div className='profile__desc'>{ shortenedDescription }</div>

                  <div className='profile__link'>
                    <Link to={`/company/${ profile.symbol }`}>+</Link>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        }
      </div>
  );
}

export default Profiles;