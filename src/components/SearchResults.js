import React, { useContext, useRef } from 'react';
import { SearchResultContext } from './../App'
import CompanyCard from './CompanyCard';
import './../App.css';


const SearchResults = (props) => {

  const resultCountRef = useRef(null);

  const { searchResults } = useContext(SearchResultContext);

  console.log(props.initialValue, props.totalResultCount)

  return (
    <React.Fragment>
      
      <div className='profile__resultcount' ref={ resultCountRef }>
        { // If < 20 results, display number of results on page
          (props.totalResultCount > 0 && props.totalResultCount < 20) && 
            `${ searchResults.length } Results:`
        }
        { // If >= 20 results, total result count returned from Finviz
          (props.totalResultCount > 0 && props.totalResultCount >= 20) && 
            `${ props.totalResultCount } Results:`
        }
        { // If no results (totalResultCount set to -1), display 'no results found'
          (props.totalResultCount < 0 ) && 'No Results Found =(' 
        }
      </div>

      <div className='profile__container'>
        { 
          searchResults.map((companyProfile, i) => {
            return <CompanyCard key={i} companyProfile={ companyProfile } />
          })
        }
      </div>

      
      { // If there are more results, show a 'next page' button
        (props.initialValue + 20) < props.totalResultCount &&
        <div className='profile__button-container'>
          <button className='profile__button'
            onClick={ () => { 
              props.runApiCall(props.initialValue + 20);
              props.setInitialValue(props.initialValue + 20);
              resultCountRef.current.scrollIntoView({ behaviour: 'smooth'});
            }}> 
            Next Page
          </button>
        </div>
      }
    </React.Fragment>
  );
}

export default SearchResults;