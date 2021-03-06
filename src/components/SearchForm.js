import React, { useState, useEffect, useContext, useRef } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SearchResultContext } from '../App';
import './../styles/SearchForm.css';
import { 
  sectorOption, 
  industryOption, 
  marketCapOption, 
  dividendYieldOption,
  trailingPEOption 
} from './../variables/SearchFormOptions';

const SearchForm = (props) => {

  const sectorRef = useRef(null);
  const industryRef = useRef(null);

  const [sector, setSector] = useState('');
  const [industry, setIndustry] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [dividendYield, setDividendYield] = useState('');
  const [trailingPE, setTrailingPE] = useState('');

  const { setSearchResults } = useContext(SearchResultContext);

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
        props.setTotalResultCount(-2); // set to show 'Loading ..'
        setSearchResults([]);
        props.setInitialValue(1);
        props.fetchStocks(1); 
      }}
      type='submit' >

      <div className='searchform__field'>
        <label htmlFor="sector">Sector</label>  
        <select 
          name='Sector' 
          id='sector' 
          value={ sector } 
          ref={ sectorRef }
          onChange={(e) => {
            industryRef.current.value = '';
            setIndustry('');
            setSector(e.target.value)
          }}>
          <option defaultValue="selected" value="">Any</option>
          {
            Object.keys(sectorOption).map((key, i) => {
              return <option key={i} value={key}>{sectorOption[key]}</option>
            })
          }
        </select>
      </div>
      <div className='searchform__field'>
        <label htmlFor="industry">Industry</label>
        <select 
          name='Industry' 
          id='industry' 
          value={ industry } 
          ref={ industryRef }
          onChange={(e) => {
            sectorRef.current.value = '';
            setSector('');
            setIndustry(e.target.value)
          }}>
          <option defaultValue="ind_stocksonly">Any</option>
          {
            Object.keys(industryOption).map((key, i) => {
              return <option key={i} value={key}>{industryOption[key]}</option>
            })
          }
        </select>
      </div>
      
      <div className='searchform__field'>
        <label htmlFor="dividend-yield">Dividend Yield</label>
        <select name='Dividend Yield' id='dividend-yield' value={ dividendYield } onChange={(e) => setDividendYield(e.target.value)}>
          <option defaultValue=''>Any</option>
          {
            Object.keys(dividendYieldOption).map((key, i) => {
              return <option key={i} value={key}>{dividendYieldOption[key]}</option>
            })
          }
        </select>
      </div>

      <div className='searchform__field'>
        <label htmlFor="market-cap">Market Cap</label>
        <select name='Market Cap' id='market-cap' value={ marketCap } onChange={(e) => setMarketCap(e.target.value)}>
          <option defaultValue=''>Any</option>
          {
            Object.keys(marketCapOption).map((key, i) => {
              return <option key={i} value={key}>{marketCapOption[key]}</option>
            })
          }
        </select>
      </div>

      <div className='searchform__field'>
        <label htmlFor="trailing-pe">Trailing P/E</label>
        <select name='Trailing P/E' id='trailing-pe' value={ trailingPE } onChange={(e) => setTrailingPE(e.target.value)}>
          <option defaultValue=''>Any</option>
          {
            Object.keys(trailingPEOption).map((key, i) => {
              return <option key={i} value={key}>{trailingPEOption[key]}</option>
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