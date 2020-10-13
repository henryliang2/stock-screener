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

  const [totalResultCount, setTotalResultCount] = useState(0);

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

    </React.Fragment>
    
  );
}

export default App;
