import React, { useState, useEffect } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './../styles/SearchForm.css';
import { 
  sectorOption, 
  industryOption, 
  marketCapOption, 
  dividendYieldOption,
  trailingPEOption 
} from './../variables/SearchFormOptions';

const SearchForm = (props) => {

  const [sector, setSector] = useState('');
  const [industry, setIndustry] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [dividendYield, setDividendYield] = useState('');
  const [trailingPE, setTrailingPE] = useState('');

  useEffect(() => { // update query options whenever a state is changed
    const queryStr = [sector, industry, marketCap, dividendYield, trailingPE]
      .filter(criteria => criteria) // only added to string if criteria exists (ie. truthy)
      .join(',');
    props.setQueryOptions(queryStr);
  })

  return (
  <div className='searchform__container'>

    <div className='searchform__title-text'>Find your next investment.</div>

    <form className='searchform'      
      onSubmit={(e) => { 
        e.preventDefault();
        props.runApiCall(1); 
      }}
      type='submit' >

      <div className='searchform__field'>
        <label htmlFor="sector">Sector</label>  
        <select name='Sector' id='sector' value={ sector } onChange={(e) => setSector(e.target.value)}>
          <option defaultValue="selected" value="">Any</option>
          {
            Object.keys(sectorOption).map(key => {
              return <option value={key}>{sectorOption[key]}</option>
            })
          }
        </select>
      </div>
      <div className='searchform__field'>
        <label htmlFor="industry">Industry</label>
        <select name='Industry' id='industry' value={ industry } onChange={(e) => setIndustry(e.target.value)}>
        <option defaultValue="ind_stocksonly">Any</option>
        {
          Object.keys(industryOption).map(key => {
            return <option value={key}>{industryOption[key]}</option>
          })
        }
      </select>
      </div>
      
      <div className='searchform__field'>
        <label htmlFor="dividend-yield">Dividend Yield</label>
        <select name='Dividend Yield' id='dividend-yield' value={ dividendYield } onChange={(e) => setDividendYield(e.target.value)}>
        <option defaultValue=''>Any</option>
        {
          Object.keys(dividendYieldOption).map(key => {
            return <option value={key}>{dividendYieldOption[key]}</option>
          })
        }
      </select>
      </div>

      <div className='searchform__field'>
        <label htmlFor="market-cap">Market Cap</label>
        <select name='Market Cap' id='market-cap' value={ marketCap } onChange={(e) => setMarketCap(e.target.value)}>
        <option defaultValue=''>Any</option>
        {
          Object.keys(marketCapOption).map(key => {
            return <option value={key}>{marketCapOption[key]}</option>
          })
        }
      </select>
      </div>

      <div className='searchform__field'>
        <label htmlFor="trailing-pe">Trailing P/E</label>
        <select name='Trailing P/E' id='trailing-pe' value={ trailingPE } onChange={(e) => setTrailingPE(e.target.value)}>
        <option defaultValue=''>Any</option>
        {
          Object.keys(trailingPEOption).map(key => {
            return <option value={key}>{trailingPEOption[key]}</option>
          })
        }
      </select>
      </div>

      <div className='searchform_button-container'>
        <input className='searchform__submit-button' value='Search' type='submit' />
      </div>
    </form>
  </div>
  );
}

export default SearchForm;