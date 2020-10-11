import React from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './../App.css'
import './../styles/Landing.css'

const Landing = () => {

  return (
    <div className='landing__container'>
      <div className='landing__text'>
        <div className='landing__title'>StockScreener</div>
        <div className='landing__desc'>StockScreener is a stock screener designed for retail and DIY investors.</div>
        <Link to='/search'>Search Now</Link>
      </div>
    </div>
  );

}

export default Landing;