import React from 'react'

import Layout from '../components/Layout/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import CharityFinder from '../components/CharityFinder/index';

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <CharityFinder />
    </Layout>
  );
}

export default IndexPage;
