import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './../styles/Company.css'

const Company = (props) => {

  let { id } = useParams();
  const symbol = id;

  const [companyProfile, setCompanyProfile] = useState({});
  const [newsArticles, setNewsArticles] = useState([]);
  const [priceChange, setPriceChange] = useState('')

  useEffect(() => {
    props.profiles.forEach(profile => {
      // extract current company profile from prop (which is an array)
      if (Object.values(profile).includes(symbol)) {
        setCompanyProfile(profile);

        // format the price change for color and pos/neg
        let change = profile.changes.toFixed(2);
        if(Math.sign(change) === 1 || Math.sign(change) === 0) change = `(+${change.toString()}%)`;
        else change = `(${change.toString()}%)`;
        setPriceChange(change);
      }
    });
  }, [])
  
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
            }>
              { priceChange }
          </div>
        </div>
      </div>

      <div className='company__description'>{ companyProfile.description }</div>
    
    <button onClick={() => {console.log(companyProfile)}}>companyProfile</button>
    <button onClick={() => {console.log(newsArticles)}}>newsArticles</button>

    </div>
  );

}

export default Company;