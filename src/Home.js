/* eslint-disable no-unused-vars */
import { Container } from '@material-ui/core'
import React from 'react'

import Banner from './Banner'
import ProductList from './components/ProductsList'
import ContentfulBanner from './ContentfulBanner'
import { useLanguage } from './hooks'

const Home = () => {
  const language = useLanguage()
  return <>
    <Banner language={language}/>
    <ContentfulBanner />
    <Container>
      <ProductList language={language}/>
    </Container>
  </>
}

export default Home
