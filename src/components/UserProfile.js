import React, { useContext } from 'react';
import { UserContext, WatchListContext } from './../App'

const UserProfile = () => {

  const { watchList, setWatchList } = useContext(WatchListContext);

  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <div className='userprofile'>
        <div className='userprofile__name'>{user.name}</div>
        <div className='userprofile__image'><img src={user.imageUrl} alt='user' /></div>
        <div className='userprofile__collection'>
          {
            watchList.map( (stock, i) => 
              <div className='collection__stockname' key={i}>{ stock }</div>)
          }
        </div>
      </div>
    </React.Fragment>
  );

}

export default UserProfile;