import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import Profiles from './components/Profiles';
import Company from './components/Company';
import dummyState from './dummy';
import './App.css';

const App = () => {

  const [profiles, setProfiles] = useState(dummyState); // use [] in production

  const [queryOptions, setQueryOptions] = useState('');

  const runApiCalls = () => {

    let count = 0; // number of total results
    let tickers = [];

    const getCompanyData = async (tickers) => {
      const array = tickers.join(',');
      const jsonData = await fetch(`https://financialmodelingprep.com/api/v3/profile/${array}?apikey=${process.env.REACT_APP_FMP_API_KEY}`);
      const data = await jsonData.json();
  
      setProfiles(data);
  
      console.log(data)
    }

    const getCompanies = async (initialValue = 1) => {

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const response = await fetch(`${proxy}https://finviz.com/screener.ashx?v=111&f=${queryOptions}&r=${initialValue}`);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const htmlElements = Array.from(doc.getElementsByClassName('screener-link-primary'));
      const countString = Array.from(doc.getElementsByClassName('count-text'))[0].textContent.split(' ')[1];
      count = parseInt(countString);

      htmlElements.forEach(node => {
        tickers.push(node.textContent);
      })

      if (count > 40) count = 40

      if (tickers.length < count) getCompanies(initialValue + 20)
      else getCompanyData(tickers)

    }

    getCompanies();

  }

  return (
    <React.Fragment>

      <Navigation />

      <Router>
        <Switch>

          <Route exact path="/">
            <SearchForm setQueryOptions={ setQueryOptions } runApiCalls={ runApiCalls } />
            <Profiles profiles={ profiles }/>
          </Route>
          
          <Route path="/company/:id" children={ 
            <Company profiles={ profiles }/>
          }/>

        </Switch>
      </Router>

    </React.Fragment>
    
  );
}

export default App;
