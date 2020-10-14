import React, { useState, useEffect } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from './components/Landing';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import Profiles from './components/Profiles';
import Company from './components/Company';
import dummyState from './dummy';
import './App.css';

export const UserContext = React.createContext(null);
export const ProfileContext = React.createContext(null);
export const WatchListContext = React.createContext(null);

const App = () => {

  // An array of retrieved companies that matches user's query
  const [profiles, setProfiles] = useState([]);

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
    if(user.googleId) {
      fetch('http://localhost:3001/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleId: user.googleId, stocks: watchList })
      })
    }
  }, [watchList])

  const runApiCall = (startNum) => {
    fetch(`http://localhost:3001/search/${startNum}/${queryOptions}`)
    .then(jsonData => jsonData.json())
    .then(responseObject => { 
      console.log(responseObject)
      if (responseObject.stockData.error) return null;
      setProfiles(responseObject.stockData) 
      setTotalResultCount(responseObject.totalResultCount);
    })
  };

  return (
    <React.Fragment>

      <UserContext.Provider value={ user }>

        <Navigation />
        
        <Router>
          <Switch>
            <ProfileContext.Provider value={ profiles }>
            <WatchListContext.Provider value={ { watchList, setWatchList } }>

              <Route exact path="/">
                <Landing setUser={ setUser }/>
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
                <Profiles 
                  initialValue={ initialValue }
                  setInitialValue={ setInitialValue }
                  runApiCall={ runApiCall }
                  />
              </Route>
              
              <Route path="/company/:id" children={ 
                <Company />
              }/>

              <Route path='/userprofile'>
              </Route>
            
            </WatchListContext.Provider>
            </ProfileContext.Provider>
          </Switch>
        </Router>

      </UserContext.Provider>

    </React.Fragment>
    
  );
}

export default App;
