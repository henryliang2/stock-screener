import React, { useContext, useEffect, useState } from 'react';
import { UserContext, WatchListContext } from './../App';
import CompanyCard from './CompanyCard';

const UserProfile = () => {

  const { watchList, setWatchList } = useContext(WatchListContext);

  const user = useContext(UserContext);

  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const tickers = watchList.join(',');
    fetch(`http://localhost:3001/companies/${tickers}`)
    .then(jsonData => jsonData.json())
    .then(responseObject => { 
      console.log(responseObject)
      if (responseObject.stockData.error) return null;
      setCollection(responseObject.stockData);
    })
  }, []);

  // update collection state whenever stock is removed from watchlist
  useEffect(() => {
    let updatedCollection = [...collection];
    updatedCollection = updatedCollection.filter(stock => watchList.includes(stock.symbol));
    console.log(updatedCollection);
    setCollection(updatedCollection);
  }, [watchList])

  return (
    <React.Fragment>
      <div className='userprofile'>
        <div className='userprofile__name'>{user.name}</div>
        <div className='userprofile__image'><img src={user.imageUrl} alt='user' /></div>
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