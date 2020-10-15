import React, { useContext, useEffect, useState } from 'react';
import { UserContext, WatchListContext } from './../App';
import CompanyCard from './CompanyCard';
import './../App.css'
import './../styles/UserProfile.css';

const UserProfile = () => {

  const { watchList } = useContext(WatchListContext);

  const { user } = useContext(UserContext);

  const [collection, setCollection] = useState([]);

  useEffect(() => {
    if(watchList.length){
      const tickers = watchList.join(',');
      fetch(`http://localhost:3001/companies/${tickers}`)
      .then(jsonData => jsonData.json())
      .then(responseObject => { 
        console.log(responseObject)
        if (responseObject.stockData.error) return null;
        setCollection(responseObject.stockData);
      })
    }
  // eslint-disable-next-line
  }, []);

  // update collection state whenever stock is removed from watchlist
  useEffect(() => {
    let updatedCollection = [...collection];
    updatedCollection = updatedCollection.filter(stock => watchList.includes(stock.symbol));
    console.log(updatedCollection);
    setCollection(updatedCollection);
  // eslint-disable-next-line
  }, [watchList])

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
              return <CompanyCard key={i} companyProfile={ companyProfile } />
            })
          }
        </div>
      </div>
    </React.Fragment>
  );

}

export default UserProfile;