import React from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './../App.css'
import './../styles/Landing.css'

const Landing = () => {

  return (
    <div className='landing'>
      <div className='landing__container'>
        <div className='landing__text'>
          <div className='landing__title'>Discover the Market.</div>
          <div className='landing__desc'>StockProfiler is a stock screener designed for retail and DIY investors.</div>
          <Link to='/search'>
            <div className='landing__signin landing__signin--google'>
              Sign in with Google
            </div>
          </Link>
          <Link to='/search'>
            <div className='landing__signin landing__signin--guest'>
              Sign in as Guest
            </div>
          </Link>
        </div>
        <div className='landing__image'>
          <img src= {process.env.PUBLIC_URL + "/splash.png"} />
        </div> 
      </div>
    </div>
  );

}

export default Landing;