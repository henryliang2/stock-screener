import React, { useState, useEffect, useContext } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ProfileContext } from './../App'
import Fundamentals from './Fundamentals';
import './../styles/Company.css'

const Company = (props) => {

  const profiles = useContext(ProfileContext);

  let { id } = useParams();
  const symbol = id;

  const [companyProfile, setCompanyProfile] = useState({});
  const [newsArticles, setNewsArticles] = useState([]);
  const [priceChange, setPriceChange] = useState('');

  // extract current company profile from prop (which is an array of all companies)
  useEffect(() => {
    profiles.forEach(profile => {
      if (Object.values(profile).includes(symbol)) {
        setCompanyProfile(profile);

        // Format the price change for color and pos/neg
        let change = profile.changes.toFixed(2);
        if(Math.sign(change) === 1 || Math.sign(change) === 0) change = `(+${change.toString()}%)`;
        else change = `(${change.toString()}%)`;
        setPriceChange(change);
      }
    });
  // eslint-disable-next-line
  }, [])

  // fetch news articles from Finnhub API
  useEffect(() => {
    fetch('http://localhost:3001/companynews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "ticker": symbol})
    })
    .then(jsonData => jsonData.json())
    .then(data => { 
      console.log(data.newsArray)
      setNewsArticles(data.newsArray)
    });
  // eslint-disable-next-line
  }, [])
  
  return (
    <div className='company'>
      <div className='company__header'>
        <div className='company__leftcol'>
          <div className='company__image'><img src={ companyProfile.image } alt='logo'/></div>
          <div className='company__headerinfo'>
            <div className='company__name'>{ companyProfile.companyName }</div>
            <div className='company__symbol'>
              { `${ companyProfile.exchangeShortName }: ${ companyProfile.symbol }` }
            </div>
            <div className='company__price'>{ companyProfile.price }</div>
            <div className='company__priceChange' style={
                {color: priceChange[1] === '+' ? 'green' : 'red'}
              }>{ priceChange }</div>
          </div>
        </div>
        
        { priceChange && 
          <Fundamentals 
            beta = { companyProfile.beta }
            lastDiv = { companyProfile.lastDiv }
            mktCap = { companyProfile.mktCap }
            volAvg = { companyProfile.volAvg }
          />
        }

      </div>

      <div className='company__info'>
        <div className='company__description'>
          <div className='company__name'>Company Information</div>
          <div>{ companyProfile.description }</div>
          <div className='company__info-line'>Sector: { companyProfile.sector }</div>
          <div className='company__info-line'>Industry: { companyProfile.industry }</div>
          <div className='company__info-line'>IPO Date: { companyProfile.ipoDate }</div>
          <div className='company__info-line'>CEO: { companyProfile.ceo }</div>
          <div className='company__info-line'>Website: <a href={ companyProfile.website }>{ companyProfile.website }</a></div>
        </div>
        <div className='company__news'>
          <div className='company__name'>Recent Headlines</div>
          {
            newsArticles.map((article, i) => {
              return (
                <div className='article' key={i}>
                  <a href={ article.url }><div className='article__image' style={{backgroundImage : `url(${article.image})`}}></div></a>
                  <div className='article__info'>
                    <div className='article__headline'><a href={ article.url }>{ article.headline }</a></div>
                    <div className='article__summary'>{ article.summary }</div>
                    <div className='article__source'>Source: { article.source }</div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    
    <button onClick={() => {console.log(companyProfile)}}>companyProfile</button>
    <button onClick={() => {console.log(newsArticles)}}>newsArticles</button>

    </div>
  );

}

export default Company;