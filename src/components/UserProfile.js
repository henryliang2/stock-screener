import React, { useContext } from 'react';
import { UserContext } from './../App'

const UserProfile = () => {

  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <div className='userprofile__name'>{user.name}</div>
      <div className='userprofile__image'><img src={user.imageUrl} alt='user' /></div>
    </React.Fragment>
  );

}

export default UserProfile;