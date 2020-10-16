import React, { useContext } from 'react';
import { SearchResultContext } from './../App'
import CompanyCard from './CompanyCard';
import './../App.css';


const SearchResults = (props) => {

  const searchResults = useContext(SearchResultContext);

  console.log(props.initialValue, props.totalResultCount)

  return (
    <React.Fragment>

      <div className='profile__container'>
        { 
          searchResults.map((companyProfile, i) => {
            return <CompanyCard key={i} companyProfile={ companyProfile } />
          })
        }
      </div>

      
      { // If there are more results, show a 'next page' button
        props.initialValue < props.totalResultCount &&
        <div className='profile__button-container'>
          <button className='profile__button'
            onClick={ () => { 
              props.runApiCall(props.initialValue + 20);
              props.setInitialValue(props.initialValue + 20);
            }}> 
            Next Page
          </button>
        </div>
      }
    </React.Fragment>
  );
}

export default SearchResults;