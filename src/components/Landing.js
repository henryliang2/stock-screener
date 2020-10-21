import React, { useContext, useEffect } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { UserContext, WatchListContext } from './../App';
import './../App.css'
import './../styles/Landing.css'

const Landing = (props) => {

  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { setWatchList } = useContext(WatchListContext);

  // if user exists, redirect to search page
  useEffect(() => { if(user.userId) history.push('/search'); })

  // Get user (after successful login) and sync with DB
  useEffect(() => {
    fetch(`http://localhost:8080/sync/`, { credentials: 'include'})
    .then(jsonUser => jsonUser.json())
    .then(returnedUser => { 
      console.log(returnedUser);
      if(!returnedUser.userId) return null;
      setUser(returnedUser);
      setWatchList(returnedUser.stocks)
    })
  }, []); // eslint-disable-line

  return (
    <div className='landing'>
      <div className='landing__container'>
        <div className='landing__text'>
          <div className='landing__title'>Surf the Market.</div>
          <div className='landing__desc'>StockSurfer is a stock screener designed for retail and DIY investors.</div>
          <a href={`https://stocksurfer-server.herokuapp.com/auth/google`}>
            <div className='landing__signin landing__signin--google'>
              <img src={process.env.PUBLIC_URL + '/google_icon.svg'} alt='google-icon'/>
              Sign in with Google
            </div>
          </a>
          <Link to='/search/guest'>
            <div className='landing__signin landing__signin--guest'>
              Sign in as Guest
            </div>
          </Link>
        </div>
        <div className='landing__image'>
          <img alt='landing' src={process.env.PUBLIC_URL + "/splash.png"} />
        </div> 
      </div>
    </div>
  );

}

export default Landing;