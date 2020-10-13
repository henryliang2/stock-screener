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

const App = () => {

  const [profiles, setProfiles] = useState([]);

  const [queryOptions, setQueryOptions] = useState('');

  const [initialValue, setInitialValue] = useState(1);

  const [totalResultCount, setTotalResultCount] = useState(0);

  const [user, setUser] = useState({ 
      "displayName": "Guest",
      "photos": [
        {
          "value": "https://lh4.googleusercontent.com/-7trTtJvSjgg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucni5AkqbzKKfqejpxISgHwATIhKYQ/s96-c/photo.jpg"
        }],
    });

  useEffect(() => {
    fetch('http://localhost:3001/user')
    .then(jsonData => jsonData.json())
    .then(returnedUser => {
      console.log(returnedUser); 
      if(returnedUser.id) setUser(returnedUser);
    });
  }, [])

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

              <Route exact path="/">
                <Landing />
              </Route>

              <Route path='/search'>
                <SearchForm 
                  setQueryOptions={ setQueryOptions } 
                  setInitialValue={ setInitialValue }
                  runApiCall={ runApiCall } 
                  />
                <Profiles 
                  totalResultCount = { totalResultCount }
                  initialValue={ initialValue }
                  setInitialValue={ setInitialValue }
                  runApiCall={ runApiCall }
                  />
              </Route>
              
              <Route path="/company/:id" children={ 
                <Company />
              }/>
            </ProfileContext.Provider>
          </Switch>
        </Router>

      </UserContext.Provider>

    </React.Fragment>
    
  );
}

export default App;
