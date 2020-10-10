import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './../styles/Company.css'

const Company = (props) => {

  let { id } = useParams();
  const symbol = id;

  const [companyProfile, setCompanyProfile] = useState({});
  const [newsArticles, setNewsArticles] = useState([]);
  const [priceChange, setPriceChange] = useState('')

  // extract current company profile from prop (which is an array of all companies)
  useEffect(() => {
    props.profiles.forEach(profile => {
      if (Object.values(profile).includes(symbol)) {
        setCompanyProfile(profile);

        // format the price change for color and pos/neg
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
    // set a date query for the past 8 months
    const dateCurr = new Date().toISOString().slice(0, 10);
    let dateOld = new Date();
    dateOld.setMonth(dateOld.getMonth() - 8);
    dateOld = dateOld.toISOString().slice(0, 10);
    const dateQuery = `&from=${dateOld}&to=${dateCurr}`

    const proxy = 'https://cors-anywhere.herokuapp.com/';

    fetch(`${proxy}https://finnhub.io/api/v1/company-news?symbol=${companyProfile.symbol}${dateQuery}`, {
      method: 'GET',
      headers: { 'X-Finnhub-Token' : process.env.REACT_APP_FINNHUB_API_KEY }
    })
    .then(jsonData => jsonData.json())
    .then(articles => {
      const returnArray = articles.slice(0, 9);
      setNewsArticles(returnArray);
    })
  }, [companyProfile])
  
  return (
    <div className='company'>
      <div className='company__header'>
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
        <div className='fundamentals'>
          <div className='fundamentals__container'>
            <div className='fundamentals__label'>Market Cap</div>
            <div className='fundamentals__value'>{ companyProfile.mktCap }</div>
          </div>
          <div className='fundamentals__container'>
            <div className='fundamentals__label'>Beta</div>
            <div className='fundamentals__value'>{ companyProfile.beta }</div>
          </div>
          <div className='fundamentals__container'>
            <div className='fundamentals__label'>Avg Volume</div>
            <div className='fundamentals__value'>{ companyProfile.volAvg }</div>
          </div>
          { companyProfile.lastDiv !== 0 &&
          <div className='fundamentals__container'>
            <div className='fundamentals__label'>Last Dividend</div>
            <div className='fundamentals__value'>${ companyProfile.lastDiv } per share</div>
          </div>
          }
        </div>
      </div>

      <div className='company__info'>
        <div className='company__description'>
          <div className='company__name'>Company Information</div>
          <div>{ companyProfile.description }</div>

          <div>Sector: { companyProfile.sector }</div>
          <div>Industry: { companyProfile.industry }</div>
          <div>IPO Date: { companyProfile.ipoDate }</div>
          <div>CEO: { companyProfile.ceo }</div>
          
        </div>
        <div className='company__news'>
          <div className='company__name'>Recent Headlines</div>
          {
            newsArticles.map((article, i) => {
              return (
                <div className='article' key={i}>
                  <div className='article__image' style={{backgroundImage : `url(${article.image})`}}></div>
                  <div className='article__info'>
                    <div className='article__headline'>{ article.headline }</div>
                    <div className='article__summary'>{ article.summary }</div>
                    <div className='article__source'>{ article.source }</div>
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