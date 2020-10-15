import React, { useContext } from 'react';
import { SearchResultContext, UserContext, WatchListContext } from './../App'
import CompanyCard from './CompanyCard';
import './../App.css';


const SearchResults = (props) => {

  const searchResults = useContext(SearchResultContext);

  return (
    <React.Fragment>

      <div className='profile__container'>
        { 
          searchResults.map((companyProfile, i) => {
            return <CompanyCard key={i} companyProfile={ companyProfile } />
          })
        }
      </div>

      { props.initialValue < props.totalResultCount &&
        <div>
          <button onClick={ () => { 
            props.runApiCall(props.initialValue + 20);
            props.setInitialValue(props.initialValue + 20);
          }}>Next Page</button>
        </div>
      }
    </React.Fragment>
  );
}

export default SearchResults;