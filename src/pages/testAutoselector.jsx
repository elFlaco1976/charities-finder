import React from 'react'

import Layout from '../components/Layout/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import CountrySelection from '../components/CountrySelection';

import CharityFinder from '../components/CharityFinder/index';

const TestSelector = () => {
  return (
    <CountrySelection 
      handleCountryToggle={() => {}}
      countryDropdownOpen={false}
      currentCountry={''}
      handleCountryChange={() => {}}
    />

  );
}

export default TestSelector;
