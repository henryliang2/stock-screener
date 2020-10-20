import React, { useEffect, useState } from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Tooltip } from '@material-ui/core';
import { indicatorDescriptions } from './../variables/indicatorDescriptions';

const Fundamentals = (props) => {

  const [marketCap, setMarketCap] = useState('');
  const [avgVolume, setAvgVolume] = useState('');

  useEffect(() => { // eslint-disable-line
    // Format the market cap to use Million/Billion/Trillion
    const mktCapStrLength = props.mktCap.toString().length;
    let mktCapStr = '';
    if (mktCapStrLength >= 13) mktCapStr = (props.mktCap / 1000000000000).toFixed(2) + ' Trillion'
    else if (mktCapStrLength >= 10) mktCapStr = (props.mktCap / 1000000000).toFixed(2) + ' Billion'
    else if (mktCapStrLength >= 7) mktCapStr = (props.mktCap / 1000000).toFixed(2) + ' Million'
    else mktCapStr = props.mktCap.toString();
    setMarketCap(mktCapStr);

    // Format Avg Volume by adding commas
    setAvgVolume(props.volAvg.toLocaleString());
  }) 

  return (
    <div className='fundamentals'>
      <div className='fundamentals__container'>
        <div className='fundamentals__label'>
          Market Cap 
          <Tooltip title={<span className='tooltip'>{indicatorDescriptions.marketCap.desc}</span>} arrow>
            <a href={indicatorDescriptions.marketCap.link}><HelpOutlineIcon fontSize={'inherit'} /></a>
          </Tooltip>
        </div>
        <div className='fundamentals__value'>{ marketCap }</div>
      </div>
      <div className='fundamentals__container'>
        <div className='fundamentals__label'>
          Beta 
          <Tooltip title={<span className='tooltip'>{indicatorDescriptions.beta.desc}</span>} arrow>
            <a href={indicatorDescriptions.beta.link}><HelpOutlineIcon fontSize={'inherit'} /></a>
          </Tooltip>
        </div>
        <div className='fundamentals__value'>{ props.beta }</div>
      </div>
      <div className='fundamentals__container'>
        <div className='fundamentals__label'>
          Avg Volume 
          <Tooltip title={<span className='tooltip'>{indicatorDescriptions.avgVol.desc}</span>} arrow>
            <a href={indicatorDescriptions.avgVol.link}><HelpOutlineIcon fontSize={'inherit'} /></a>
          </Tooltip>
        </div>
        <div className='fundamentals__value'>{ avgVolume }</div>
      </div>
      { props.lastDiv !== 0 &&
      <div className='fundamentals__container'>
        <div className='fundamentals__label'>
          Last Dividend 
          <Tooltip title={<span className='tooltip'>{indicatorDescriptions.lastDiv.desc}</span>} arrow>
            <a href={indicatorDescriptions.lastDiv.link}><HelpOutlineIcon fontSize={'inherit'} /></a>
          </Tooltip>
        </div>
        <div className='fundamentals__value'>${ props.lastDiv } per share</div>
      </div>
      }
    </div>
  );

}

export default Fundamentals;