import React, { useState, useEffect } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from './components/Landing';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import SearchResults from './components/SearchResults';
import Company from './components/Company';
import UserProfile from './components/UserProfile.js';
import './App.css';

export const UserContext = React.createContext(null);
export const SearchResultContext = React.createContext(null);
export const WatchListContext = React.createContext(null);

const App = () => {

  // An array of retrieved companies that matches user's query
  const [searchResults, setSearchResults] = useState([]); // use [];

  // Query options and value of the index of the first result for scraping Finviz
  const [queryOptions, setQueryOptions] = useState('');
  const [initialValue, setInitialValue] = useState(1);

  // number of results returned from Finviz
  // intialize to 0; set to -1 if query run and no results
  const [totalResultCount, setTotalResultCount] = useState(0);

  // Object containing authenticated user information
  const [user, setUser] = useState({});

  // User's Individual Watch List
  const [watchList, setWatchList] = useState([]);

  // update DB whenever watchlist is modified
  useEffect(() => {
    if(user.userId) {
      fetch(`https://stocksurfer-server.herokuapp.com/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stocks: watchList }),
        credentials: 'include'
      })
    }
  }, [watchList]) // eslint-disable-line

  const fetchStocks = (startNum) => {
    fetch(`https://stocksurfer-server.herokuapp.com/search/${startNum}/${queryOptions}`)
    .then(jsonData => jsonData.json())
    .then(responseObject => { 
      if (responseObject.stockData.error) {
        setSearchResults([]);
        setTotalResultCount(-1);
        return null
      } 
      else {
        const filteredStocks = responseObject.stockData.filter(stock => {
          return (stock.description && stock.industry)
        })
        setSearchResults(filteredStocks) 
        setTotalResultCount(responseObject.totalResultCount);
      }
    })
  };

  return (
    <React.Fragment>

      <UserContext.Provider value={ { user, setUser } }>
        <Router>

          <Navigation />

          <Switch>
            <SearchResultContext.Provider value={ { searchResults, setSearchResults } }>
            <WatchListContext.Provider value={ { watchList, setWatchList } }>

              <Route exact path="/">
                <Landing />
              </Route>

              <Route path='/search'>
                <SearchForm 
                  setTotalResultCount = { setTotalResultCount }
                  setQueryOptions={ setQueryOptions } 
                  setInitialValue={ setInitialValue }
                  fetchStocks={ fetchStocks } 
                  />
                <SearchResults 
                  initialValue={ initialValue }
                  totalResultCount={ totalResultCount }
                  setTotalResultCount = { setTotalResultCount }
                  setInitialValue={ setInitialValue }
                  fetchStocks={ fetchStocks }
                  />
              </Route>
              
              <Route path="/company/:id" children={ 
                <Company />
              }/>

              <Route path='/userprofile'>
                <UserProfile />
              </Route>
            
            </WatchListContext.Provider>
            </SearchResultContext.Provider>
          </Switch>
        </Router>

      </UserContext.Provider>

    </React.Fragment>
    
  );
}

export default App;
