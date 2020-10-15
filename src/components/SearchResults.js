import React, { useContext, useEffect } from 'react';
import { SearchResultContext, UserContext, WatchListContext } from './../App'
import CompanyCard from './CompanyCard';
import './../App.css';


const SearchResults = (props) => {

  const user = useContext(UserContext);

  const searchResults = useContext(SearchResultContext);

  const { watchList, setWatchList } = useContext(WatchListContext);

  // Sync watchlist with DB on login
  useEffect(() => {
    if(user.googleId) {
      console.log(user);
      fetch(`http://localhost:3001/sync/${user.googleId}`)
      .then(jsonUser => jsonUser.json())
      .then(user => setWatchList(user.stocks));
    }
  // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>

      <div className='profile__container'>
        { 
          searchResults.map((companyProfile, i) => {
            return <CompanyCard key={i} companyProfile={ companyProfile } />
          })
        }
      </div>

      { props.initialValue < props.totalResultCount &&
        <div>
          <button onClick={ () => { 
            props.runApiCall(props.initialValue + 20);
            props.setInitialValue(props.initialValue + 20);
          }}>Next Page</button>
        </div>
      }
    </React.Fragment>
  );
}

export default SearchResults;