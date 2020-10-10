import React, { useEffect, useState } from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Tooltip } from '@material-ui/core';

const Fundamentals = (props) => {

  const [marketCap, setMarketCap] = useState('');
  const [avgVolume, setAvgVolume] = useState('');

  useEffect(() => {
    // Format the market cap to use Million/Billion/Trillion
    const mktCapStrLength = props.mktCap.toString().length;
    let mktCapStr = '';
    if (mktCapStrLength >= 13) mktCapStr = (props.mktCap / 1000000000000).toFixed(2) + ' Trillion'
    else if (mktCapStrLength >= 10) mktCapStr = (props.mktCap / 1000000000).toFixed(2) + ' Billion'
    else if (mktCapStrLength >= 7) mktCapStr = (props.mktCap / 1000000000).toFixed(2) + ' Million'
    else mktCapStr = props.mktCap.toString();
    setMarketCap(mktCapStr);

    // Format Avg Volume by adding commas
    setAvgVolume(props.volAvg.toLocaleString());
    // eslint-disable-next-line
  }, [])

  return (
    <div className='fundamentals'>
      <div className='fundamentals__container'>
        <div className='fundamentals__label'>
          Market Cap <Tooltip title="Market Capitalization is the total value of all of the company's shares of stock. You can calculate market cap by multiplying the Share Price with the number of Shares Outstanding." arrow><a href='https://www.investopedia.com/terms/m/marketcapitalization.asp'><HelpOutlineIcon /></a></Tooltip>
        </div>
        <div className='fundamentals__value'>{ marketCap }</div>
      </div>
      <div className='fundamentals__container'>
        <div className='fundamentals__label'>
          Beta <Tooltip title='Beta is a measure a market risk compared to the overall market. A stock with Beta greater than 1 indicates a stock more volatile than that of the overall market, and a stock with Beta less than 1 indicates a stock less volatile. A company with a negative Beta tends to move in the opposite direction of the overall stock market' arrow><a href='https://www.investopedia.com/terms/b/beta.asp'><HelpOutlineIcon /></a></Tooltip>
        </div>
        <div className='fundamentals__value'>{ props.beta }</div>
      </div>
      <div className='fundamentals__container'>
        <div className='fundamentals__label'>
          Avg Daily Volume <Tooltip title='Average Volume is the average number of shares of this company traded per day' arrow><a href='https://www.investopedia.com/terms/a/averagedailytradingvolume.asp'><HelpOutlineIcon /></a></Tooltip>
        </div>
        <div className='fundamentals__value'>{ avgVolume }</div>
      </div>
      { props.lastDiv !== 0 &&
      <div className='fundamentals__container'>
        <div className='fundamentals__label'>
          Last Dividend <Tooltip title='The value of the last dividend paid out by the company' arrow><a href='https://www.investopedia.com/terms/d/dividend.asp'><HelpOutlineIcon /></a></Tooltip>
        </div>
        <div className='fundamentals__value'>${ props.lastDiv } per share</div>
      </div>
      }
    </div>
  );

}

export default Fundamentals;