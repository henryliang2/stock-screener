import React, { useState, useEffect } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './../styles/SearchForm.css'

const SearchForm = (props) => {

  const [sector, setSector] = useState('');
  const [industry, setIndustry] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [dividendYield, setDividendYield] = useState('');
  const [trailingPE, setTrailingPE] = useState('');

  useEffect(() => { // update query options whenever a state is changed
    const queryStr = [sector, industry, marketCap, dividendYield, trailingPE]
      .filter(criteria => criteria) // only added to string if criteria exists (ie. truthy)
      .join(',');
    props.setQueryOptions(queryStr);
  })

  return (
    <form className='searchform'      
      onSubmit={(e) => { 
        e.preventDefault();
        props.runApiCall(1); 
      }}
      type='submit' >

      <div className='searchform__title-text'>Find your next investment.</div>

      <div className='searchform__field'>
        <label htmlFor="sector">Sector</label>  
        <select name='Sector' id='sector' value={ sector } onChange={(e) => setSector(e.target.value)}>
        <option defaultValue="selected" value="">Any</option>
        <option value="sec_basicmaterials">Basic Materials</option>
        <option value="sec_communicationservices">Communication Services</option>
        <option value="sec_consumercyclical">Consumer Cyclical</option>
        <option value="sec_consumerdefensive">Consumer Defensive</option>
        <option value="sec_energy">Energy</option>
        <option value="sec_financial">Financial</option>
        <option value="sec_healthcare">Healthcare</option>
        <option value="sec_industrials">Industrials</option>
        <option value="sec_realestate">Real Estate</option>
        <option value="sec_technology">Technology</option>
        <option value="sec_utilities">Utilities</option>
      </select>
      </div>
      <div className='searchform__field'>
        <label htmlFor="industry">Industry</label>
        <select name='Industry' id='industry' value={ industry } onChange={(e) => setIndustry(e.target.value)}>
        <option defaultValue="ind_stocksonly">Any</option>
        <option value="ind_advertisingagencies">Advertising Agencies</option>
        <option value="ind_aerospacedefense">Aerospace &amp; Defense</option>
        <option value="ind_agriculturalinputs">Agricultural Inputs</option>
        <option value="ind_airlines">Airlines</option>
        <option value="ind_airportsairservices">Airports &amp; Air Services</option>
        <option value="ind_aluminum">Aluminum</option>
        <option value="ind_apparelmanufacturing">Apparel Manufacturing</option>
        <option value="ind_apparelretail">Apparel Retail</option>
        <option value="ind_assetmanagement">Asset Management</option>
        <option value="ind_automanufacturers">Auto Manufacturers</option>
        <option value="ind_autoparts">Auto Parts</option>
        <option value="ind_autotruckdealerships">Auto &amp; Truck Dealerships</option>
        <option value="ind_banksdiversified">Banks - Diversified</option>
        <option value="ind_banksregional">Banks - Regional</option>
        <option value="ind_beveragesbrewers">Beverages - Brewers</option>
        <option value="ind_beveragesnonalcoholic">Beverages - Non-Alcoholic</option>
        <option value="ind_beverageswineriesdistilleries">Beverages - Wineries &amp; Distilleries</option>
        <option value="ind_biotechnology">Biotechnology</option>
        <option value="ind_broadcasting">Broadcasting</option>
        <option value="ind_buildingmaterials">Building Materials</option>
        <option value="ind_buildingproductsequipment">Building Products &amp; Equipment</option>
        <option value="ind_businessequipmentsupplies">Business Equipment &amp; Supplies</option>
        <option value="ind_capitalmarkets">Capital Markets</option>
        <option value="ind_chemicals">Chemicals</option>
        <option value="ind_closedendfunddebt">Closed-End Fund - Debt</option>
        <option value="ind_closedendfundequity">Closed-End Fund - Equity</option>
        <option value="ind_closedendfundforeign">Closed-End Fund - Foreign</option>
        <option value="ind_cokingcoal">Coking Coal</option>
        <option value="ind_communicationequipment">Communication Equipment</option>
        <option value="ind_computerhardware">Computer Hardware</option>
        <option value="ind_confectioners">Confectioners</option>
        <option value="ind_conglomerates">Conglomerates</option>
        <option value="ind_consultingservices">Consulting Services</option>
        <option value="ind_consumerelectronics">Consumer Electronics</option>
        <option value="ind_copper">Copper</option>
        <option value="ind_creditservices">Credit Services</option>
        <option value="ind_departmentstores">Department Stores</option>
        <option value="ind_diagnosticsresearch">Diagnostics &amp; Research</option>
        <option value="ind_discountstores">Discount Stores</option>
        <option value="ind_drugmanufacturersgeneral">Drug Manufacturers - General</option>
        <option value="ind_drugmanufacturersspecialtygeneric">Drug Manufacturers - Specialty &amp; Generic</option>
        <option value="ind_educationtrainingservices">Education &amp; Training Services</option>
        <option value="ind_electricalequipmentparts">Electrical Equipment &amp; Parts</option>
        <option value="ind_electroniccomponents">Electronic Components</option>
        <option value="ind_electronicgamingmultimedia">Electronic Gaming &amp; Multimedia</option>
        <option value="ind_electronicscomputerdistribution">Electronics &amp; Computer Distribution</option>
        <option value="ind_engineeringconstruction">Engineering &amp; Construction</option>
        <option value="ind_entertainment">Entertainment</option>
        <option value="ind_exchangetradedfund">Exchange Traded Fund</option>
        <option value="ind_farmheavyconstructionmachinery">Farm &amp; Heavy Construction Machinery</option>
        <option value="ind_farmproducts">Farm Products</option>
        <option value="ind_financialconglomerates">Financial Conglomerates</option>
        <option value="ind_financialdatastockexchanges">Financial Data &amp; Stock Exchanges</option>
        <option value="ind_fooddistribution">Food Distribution</option>
        <option value="ind_footwearaccessories">Footwear &amp; Accessories</option>
        <option value="ind_furnishingsfixturesappliances">Furnishings, Fixtures &amp; Appliances</option>
        <option value="ind_gambling">Gambling</option>
        <option value="ind_gold">Gold</option>
        <option value="ind_grocerystores">Grocery Stores</option>
        <option value="ind_healthcareplans">Healthcare Plans</option>
        <option value="ind_healthinformationservices">Health Information Services</option>
        <option value="ind_homeimprovementretail">Home Improvement Retail</option>
        <option value="ind_householdpersonalproducts">Household &amp; Personal Products</option>
        <option value="ind_industrialdistribution">Industrial Distribution</option>
        <option value="ind_informationtechnologyservices">Information Technology Services</option>
        <option value="ind_infrastructureoperations">Infrastructure Operations</option>
        <option value="ind_insurancebrokers">Insurance Brokers</option>
        <option value="ind_insurancediversified">Insurance - Diversified</option>
        <option value="ind_insurancelife">Insurance - Life</option>
        <option value="ind_insurancepropertycasualty">Insurance - Property &amp; Casualty</option>
        <option value="ind_insurancereinsurance">Insurance - Reinsurance</option>
        <option value="ind_insurancespecialty">Insurance - Specialty</option>
        <option value="ind_integratedfreightlogistics">Integrated Freight &amp; Logistics</option>
        <option value="ind_internetcontentinformation">Internet Content &amp; Information</option>
        <option value="ind_internetretail">Internet Retail</option>
        <option value="ind_leisure">Leisure</option>
        <option value="ind_lodging">Lodging</option>
        <option value="ind_lumberwoodproduction">Lumber &amp; Wood Production</option>
        <option value="ind_luxurygoods">Luxury Goods</option>
        <option value="ind_marineshipping">Marine Shipping</option>
        <option value="ind_medicalcarefacilities">Medical Care Facilities</option>
        <option value="ind_medicaldevices">Medical Devices</option>
        <option value="ind_medicaldistribution">Medical Distribution</option>
        <option value="ind_medicalinstrumentssupplies">Medical Instruments &amp; Supplies</option>
        <option value="ind_metalfabrication">Metal Fabrication</option>
        <option value="ind_mortgagefinance">Mortgage Finance</option>
        <option value="ind_oilgasdrilling">Oil &amp; Gas Drilling</option>
        <option value="ind_oilgasep">Oil &amp; Gas E&amp;P</option>
        <option value="ind_oilgasequipmentservices">Oil &amp; Gas Equipment &amp; Services</option>
        <option value="ind_oilgasintegrated">Oil &amp; Gas Integrated</option>
        <option value="ind_oilgasmidstream">Oil &amp; Gas Midstream</option>
        <option value="ind_oilgasrefiningmarketing">Oil &amp; Gas Refining &amp; Marketing</option>
        <option value="ind_otherindustrialmetalsmining">Other Industrial Metals &amp; Mining</option>
        <option value="ind_otherpreciousmetalsmining">Other Precious Metals &amp; Mining</option>
        <option value="ind_packagedfoods">Packaged Foods</option>
        <option value="ind_packagingcontainers">Packaging &amp; Containers</option>
        <option value="ind_paperpaperproducts">Paper &amp; Paper Products</option>
        <option value="ind_personalservices">Personal Services</option>
        <option value="ind_pharmaceuticalretailers">Pharmaceutical Retailers</option>
        <option value="ind_pollutiontreatmentcontrols">Pollution &amp; Treatment Controls</option>
        <option value="ind_publishing">Publishing</option>
        <option value="ind_railroads">Railroads</option>
        <option value="ind_realestatedevelopment">Real Estate - Development</option>
        <option value="ind_realestatediversified">Real Estate - Diversified</option>
        <option value="ind_realestateservices">Real Estate Services</option>
        <option value="ind_recreationalvehicles">Recreational Vehicles</option>
        <option value="ind_reitdiversified">REIT - Diversified</option>
        <option value="ind_reithealthcarefacilities">REIT - Healthcare Facilities</option>
        <option value="ind_reithotelmotel">REIT - Hotel &amp; Motel</option>
        <option value="ind_reitindustrial">REIT - Industrial</option>
        <option value="ind_reitmortgage">REIT - Mortgage</option>
        <option value="ind_reitoffice">REIT - Office</option>
        <option value="ind_reitresidential">REIT - Residential</option>
        <option value="ind_reitretail">REIT - Retail</option>
        <option value="ind_reitspecialty">REIT - Specialty</option>
        <option value="ind_rentalleasingservices">Rental &amp; Leasing Services</option>
        <option value="ind_residentialconstruction">Residential Construction</option>
        <option value="ind_resortscasinos">Resorts &amp; Casinos</option>
        <option value="ind_restaurants">Restaurants</option>
        <option value="ind_scientifictechnicalinstruments">Scientific &amp; Technical Instruments</option>
        <option value="ind_securityprotectionservices">Security &amp; Protection Services</option>
        <option value="ind_semiconductorequipmentmaterials">Semiconductor Equipment &amp; Materials</option>
        <option value="ind_semiconductors">Semiconductors</option>
        <option value="ind_shellcompanies">Shell Companies</option>
        <option value="ind_silver">Silver</option>
        <option value="ind_softwareapplication">Software - Application</option>
        <option value="ind_softwareinfrastructure">Software - Infrastructure</option>
        <option value="ind_solar">Solar</option>
        <option value="ind_specialtybusinessservices">Specialty Business Services</option>
        <option value="ind_specialtychemicals">Specialty Chemicals</option>
        <option value="ind_specialtyindustrialmachinery">Specialty Industrial Machinery</option>
        <option value="ind_specialtyretail">Specialty Retail</option>
        <option value="ind_staffingemploymentservices">Staffing &amp; Employment Services</option>
        <option value="ind_steel">Steel</option>
        <option value="ind_telecomservices">Telecom Services</option>
        <option value="ind_textilemanufacturing">Textile Manufacturing</option>
        <option value="ind_thermalcoal">Thermal Coal</option>
        <option value="ind_tobacco">Tobacco</option>
        <option value="ind_toolsaccessories">Tools &amp; Accessories</option>
        <option value="ind_travelservices">Travel Services</option>
        <option value="ind_trucking">Trucking</option>
        <option value="ind_uranium">Uranium</option>
        <option value="ind_utilitiesdiversified">Utilities - Diversified</option>
        <option value="ind_utilitiesindependentpowerproducers">Utilities - Independent Power Producers</option>
        <option value="ind_utilitiesregulatedelectric">Utilities - Regulated Electric</option>
        <option value="ind_utilitiesregulatedgas">Utilities - Regulated Gas</option>
        <option value="ind_utilitiesregulatedwater">Utilities - Regulated Water</option>
        <option value="ind_utilitiesrenewable">Utilities - Renewable</option>
        <option value="ind_wastemanagement">Waste Management</option>
      </select>
      </div>
      <div className='searchform__field'>
        <label  htmlFor="market-cap">Market Cap</label>
        <select name='Market Cap' id='market-cap' value={ marketCap } onChange={(e) => setMarketCap(e.target.value)}>
        <option defaultValue=''>Any</option>
        <option value='cap_mega'>Mega (200 Bn or Greater)</option>
        <option value='cap_large'>Large (10 Bn - 200 Bn)</option>
        <option value='cap_mid'>Mid (2 Bn - 10 Bn)</option>
        <option value='cap_small'>Small (300 Mn - 2 Bn)</option>
        <option value='cap_micro'>Micro (50 Mn - 300 Mn)</option>
        <option value='cap_nano'>Nano (Under 50 Mn)</option>
      </select>
      </div>
      <div className='searchform__field'>
        <label htmlFor="dividend-yield">Dividend Yield</label>
        <select name='Dividend Yield' id='dividend-yield' value={ dividendYield } onChange={(e) => setDividendYield(e.target.value)}>
        <option defaultValue="">Any</option>
        <option value="fa_div_none">None (0%)</option>
        <option value="fa_div_pos">Positive (&gt;0%)</option>
        <option value="fa_div_high">High (&gt;5%)</option>
        <option value="fa_div_veryhigh">Very High (&gt;10%)</option>
        <option value="fa_div_o1">Over 1%</option>
        <option value="fa_div_o2">Over 2%</option>
        <option value="fa_div_o3">Over 3%</option>
        <option value="fa_div_o4">Over 4%</option>
        <option value="fa_div_o5">Over 5%</option>
        <option value="fa_div_o6">Over 6%</option>
        <option value="fa_div_o7">Over 7%</option>
        <option value="fa_div_o8">Over 8%</option>
        <option value="fa_div_o9">Over 9%</option>
        <option value="fa_div_o10">Over 10%</option>
      </select>
      </div>
      <div className='searchform__field'>

        <label htmlFor="trailing-pe">Trailing P/E</label>
        <select name='Trailing P/E' id='trailing-pe' value={ trailingPE } onChange={(e) => setTrailingPE(e.target.value)}>
        <option defaultValue="">Any</option>
        <option value="fa_pe_low">Low (&lt;15)</option>
        <option value="fa_pe_profitable">Profitable (&gt;0)</option>
        <option value="fa_pe_high">High (&gt;50)</option>
        <option value="fa_pe_u5">Under 5</option>
        <option value="fa_pe_u10">Under 10</option>
        <option value="fa_pe_u15">Under 15</option>
        <option value="fa_pe_u20">Under 20</option>
        <option value="fa_pe_u25">Under 25</option>
        <option value="fa_pe_u30">Under 30</option>
        <option value="fa_pe_u35">Under 35</option>
        <option value="fa_pe_u40">Under 40</option>
        <option value="fa_pe_u45">Under 45</option>
        <option value="fa_pe_u50">Under 50</option>
        <option value="fa_pe_o5">Over 5</option>
        <option value="fa_pe_o10">Over 10</option>
        <option value="fa_pe_o15">Over 15</option>
        <option value="fa_pe_o20">Over 20</option>
        <option value="fa_pe_o25">Over 25</option>
        <option value="fa_pe_o30">Over 30</option>
        <option value="fa_pe_o35">Over 35</option>
        <option value="fa_pe_o40">Over 40</option>
        <option value="fa_pe_o45">Over 45</option>
        <option value="fa_pe_o50">Over 50</option>
      </select>
      </div>

      <div className='searchform_button-container'>
        <input className='searchform__submit-button' type='submit' />
      </div>
    </form>
  );
}

export default SearchForm;