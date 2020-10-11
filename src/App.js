import React, { useState } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from './components/Landing';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import Profiles from './components/Profiles';
import Company from './components/Company';
import dummyState from './dummy';
import './App.css';

export const ProfileContext = React.createContext(null);

const App = () => {

  const [profiles, setProfiles] = useState([]);

  const [queryOptions, setQueryOptions] = useState('');

  const [initialValue, setInitialValue] = useState(1);

  const runApiCall = () => {
    fetch('http://localhost:3001/search', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ 
        "queryOptions" : queryOptions, 
        "initialValue" : initialValue
      })
    })
    .then(jsonData => jsonData.json())
    .then(data => { setProfiles(data) })
  };

  return (
    <React.Fragment>

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

    </React.Fragment>
    
  );
}

export default App;
