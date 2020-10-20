import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

const Chart = (props) => {

  const viewRangeSelector = useRef(null);

  const originSelector = useRef(null);

  const [quoteData, setQuoteData] = useState([]);

  // Time frame (in days) to show on graph, based on 253 trading days per year
  // 253 days => 1 year
  // 122 days => 6 months
  // 64 days => 3 months 
  const [activeTimeFrame, setActiveTimeFrame] = useState(122);

  // Absolute or Relative Y-Axis origin on graph
  // 0 => relative Y-origin
  // 1 => absolute Y-origin
  const [isAbsolute, setIsAbsolute] = useState(0);

  // fetch quote data from server on load
  useEffect(() => {
    fetch(`https://stocksurfer-server.netlify.app/quote/${props.symbol}`)
    .then(jsonData => jsonData.json())
    .then(data => setQuoteData(data.quoteData));
  }, [])

  // append SVG
  useEffect(() => {
    // clear any existing SVG to make room for new one
    d3.selectAll('svg').remove(); 

    // Highlight active button for graph options
    let viewRangeIndex = 0; // index of the activeTimeFrame button to highlight
    switch(activeTimeFrame){
      case(64): viewRangeIndex = 0; break;
      case(122): viewRangeIndex = 1; break;
      case(253): viewRangeIndex = 2; break;
    }
    for(let button of viewRangeSelector.current.children){
      button.className='chart__button'
    }
    viewRangeSelector.current.children[viewRangeIndex].classList.add('chart__button--highlighted')

    for(let button of originSelector.current.children){
      button.className='chart__button'
    }
    originSelector.current.children[isAbsolute].classList.add('chart__button--highlighted')

    const series = [...quoteData].slice(0, activeTimeFrame)
      
    console.log(series);

    const margin = 40;
    const width = 400;
    const height = 240;

    const data = series.map(dataPoint => [
        new Date(dataPoint.date), 
        dataPoint.close
      ]);

    const xMin = d3.extent(data.map(dataPoint => dataPoint[0]))[0];
    const xMax = d3.extent(data.map(dataPoint => dataPoint[0]))[1];
    const yMin = d3.extent(data.map(dataPoint => dataPoint[1]))[0];
    const yMax = d3.extent(data.map(dataPoint => dataPoint[1]))[1];

    console.log(xMin, xMax, yMin, yMax);

    const xScale = d3.scaleTime()
      .domain([xMin, xMax])
      .range([0, width - margin ])

    const xAxis = d3.axisBottom(xScale)

    const yScale = d3.scaleLinear()
      // use y-Axis origin of ZERO for Absolute
      // use y-Axis origin  of yMin for Relative
      .domain([isAbsolute ? 0 : yMin, yMax])  
      .range([height - margin, 0]); // reverse due to upside-down y-axis

    const yAxis = d3.axisLeft(yScale)

    const lineGenerator = d3.line()
      .x( function(d, i){
        return xScale(d[0])
        })
      .y( function(d, i){
        return yScale(d[1])
      })

    const pathData = lineGenerator(data);

    // Stock Movement Path
    d3.select('.chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', '#111b30')
      .attr('transform', `translate(${margin}, 0)`)
      .attr('d', pathData);

    // X Axis
    d3.select('svg')
      .append('g')
      .attr('transform', `translate(${margin}, ${height - margin})`)
      .style('color', '#888')
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('x', '-18')
      .attr('y', '8')
    
    // Y Axis
    d3.select('svg')
      .append('g') 
      .attr('transform', `translate(${margin}, 0)`)
      .style('color', '#888')
      .call(yAxis)

  }, [activeTimeFrame, isAbsolute, quoteData])

  return (
    <div className='chart__container'>
      <div className='chart'></div>
      <div className='chart__button-container' ref={ originSelector }>
        <button class='chart__button' onClick={() => { setIsAbsolute(0)}}>
          Relative Origin
        </button>
        <button class='chart__button' onClick={() => { setIsAbsolute(1)}}>
          Absolute Origin
        </button>
      </div>
      <div className='chart__button-container' ref={ viewRangeSelector }>
        <button class='chart__button' onClick={() => { setActiveTimeFrame(64) }}>
          3 Months
        </button>
        <button class='chart__button' onClick={() => { setActiveTimeFrame(122) }}>
          6 Months
        </button>
        <button class='chart__button' onClick={() => { setActiveTimeFrame(253) }}>
          1 Year
        </button>
      </div>
    </div>
  );
}

export default Chart;