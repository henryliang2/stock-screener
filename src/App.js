import React, { useState, useEffect } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from './components/Landing';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import SearchResults from './components/SearchResults';
import Company from './components/Company';
import UserProfile from './components/UserProfile.js';
import dummyState from './dummy';
import './App.css';

export const UserContext = React.createContext(null);
export const SearchResultContext = React.createContext(null);
export const WatchListContext = React.createContext(null);

const App = () => {

  // An array of retrieved companies that matches user's query
  const [searchResults, setSearchResults] = useState(dummyState); // use [];

  // Query options and value of the index of the first result for scraping Finviz
  const [queryOptions, setQueryOptions] = useState('');
  const [initialValue, setInitialValue] = useState(1);
  const [totalResultCount, setTotalResultCount] = useState(0);

  // Object containing authenticated user information
  const [user, setUser] = useState({});

  // User's Individual Watch List
  const [watchList, setWatchList] = useState([]);

  // update DB whenever watchlist is modified
  useEffect(() => {
    if(user.userId) {
      fetch(`https://stocksurfer-server.netlify.app/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stocks: watchList }),
        credentials: 'include'
      })
    }
  }, [watchList])

  const runApiCall = (startNum) => {
    fetch(`https://stocksurfer-server.netlify.app/search/${startNum}/${queryOptions}`)
    .then(jsonData => jsonData.json())
    .then(responseObject => { 
      console.log(responseObject)
      if (responseObject.stockData.error) return null;
      setSearchResults(responseObject.stockData) 
      setTotalResultCount(responseObject.totalResultCount);
    })
  };

  return (
    <React.Fragment>

      <UserContext.Provider value={ { user, setUser } }>
        <Router>

          <Navigation />

          <Switch>
            <SearchResultContext.Provider value={ searchResults }>
            <WatchListContext.Provider value={ { watchList, setWatchList } }>

              <Route exact path="/">
                <Landing />
              </Route>

              <Route path='/search'>
                <SearchForm 
                  setQueryOptions={ setQueryOptions } 
                  setInitialValue={ setInitialValue }
                  runApiCall={ runApiCall } 
                  />
                { 
                  totalResultCount > 0 &&
                  <div className='profile__resultcount'>{ totalResultCount } Results:</div>
                }
                <SearchResults 
                  initialValue={ initialValue }
                  totalResultCount={ totalResultCount }
                  setInitialValue={ setInitialValue }
                  runApiCall={ runApiCall }
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
