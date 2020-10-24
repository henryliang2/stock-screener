import React, { useContext, useEffect, useState } from 'react';
import { UserContext, WatchListContext, SearchResultContext } from './../App';
import ProfileCard from './ProfileCard';
import './../App.css'
import './../styles/UserProfile.css';

const UserProfile = () => {

  const { setSearchResults } = useContext(SearchResultContext);
  const { watchList } = useContext(WatchListContext);
  const { user } = useContext(UserContext);

  // collection is an array of objects containing data about each of the
  // stocks in user's watchlist
  const [collection, setCollection] = useState([]);

  // Find data for all tickers in watchlist and then set collection state
  useEffect(() => {
    if(watchList.length){
      const tickers = watchList.join(',');
      fetch(`https://stocksurfer-server.herokuapp.com/api/companies/${tickers}`)
      .then(jsonData => jsonData.json())
      .then(responseObject => { 
        if (responseObject.stockData.error) return null;
        setSearchResults(responseObject.stockData);
        setCollection(responseObject.stockData);
      })
    }
  }, []); // eslint-disable-line

  // update collection state whenever stock is removed from watchlist
  useEffect(() => {
    let updatedCollection = [...collection];
    updatedCollection = updatedCollection.filter(stock => watchList.includes(stock.symbol));
    setCollection(updatedCollection);
  }, [watchList]) // eslint-disable-line

  return (
    <React.Fragment>
      <div className='userprofile'>
        <div className='userprofile__user-info'>
          <div className='userprofile__image'><img src={user.image} alt='user' /></div>
          <div className='userprofile__name'>My Collection ({collection.length} stocks)</div>
        </div>
        <div className='profile__container'>
          {
            collection.map((companyProfile, i) => {
              return <ProfileCard key={i} companyProfile={ companyProfile } />
            })
          }
        </div>
      </div>
    </React.Fragment>
  );

}

export default UserProfile;