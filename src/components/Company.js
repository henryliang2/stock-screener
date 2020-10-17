import React, { useState, useEffect, useContext, useRef } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SearchResultContext, WatchListContext } from './../App'
import Fundamentals from './Fundamentals';
import './../styles/Company.css'

const Company = (props) => {

  const { id } = useParams();
  const symbol = id;

  const searchResults = useContext(SearchResultContext);
  const {watchList, setWatchList} = useContext(WatchListContext);

  const [companyProfile, setCompanyProfile] = useState({});
  const [newsArticles, setNewsArticles] = useState([]);
  const [priceChange, setPriceChange] = useState('');

  // extract current company profile from prop (which is an array of all companies)
  useEffect(() => {
    searchResults.forEach(result => {
      if (Object.values(result).includes(symbol)) {
        setCompanyProfile(result);

        // Format the price change for color and pos/neg
        let change = result.changes.toFixed(2);
        if(Math.sign(change) === 1 || Math.sign(change) === 0) change = `(+${change.toString()}%)`;
        else change = `(${change.toString()}%)`;
        setPriceChange(change);
      }
    });
  })

  // fetch news articles from Finnhub API
  useEffect(() => {
    fetch(`https://stocksurfer-server.netlify.app/companynews/${symbol}`)
    .then(jsonData => jsonData.json())
    .then(data => { 
      setNewsArticles(data.newsArray)
    });
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
              }>
              { priceChange }
            </div>
            { 
              !watchList.includes(companyProfile.symbol) &&
              <button className='company-card__button company-card__button--save' onClick={() => {
                setWatchList([...watchList, companyProfile.symbol]);
              }}>+ Save to My Collection</button>
            }
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
              return <Article article={article} key={i} />
            })
          }
        </div>
      </div>
    
    <button onClick={() => {console.log(companyProfile)}}>companyProfile</button>
    <button onClick={() => {console.log(newsArticles)}}>newsArticles</button>

    </div>
  );

}

export const Article = (props) => {

  const articleRef = useRef(null)

  return (
    <div className='article' ref={articleRef}>
      <a href={ props.article.url }>
        <div className='article__image'>
          <img src={ props.article.image } 
            alt='article' 
            onLoad={() => { articleRef.current.classList.add('fade-in')}}
            />
        </div>
      </a>
      <div className='article__info'>
        <div className='article__headline'><a href={ props.article.url }>{ props.article.headline }</a></div>
        <div className='article__summary'>{ props.article.summary }</div>
        <div className='article__source'>Source: { props.article.source }</div>
      </div>
    </div>
  );
}

export default Company;