import { Container } from '@material-ui/core'
import { Link } from "gatsby"
import React from "react"

import Banner from '../components/Banner'
import ContentfulBanner from '../components/ContentfulBanner'
import Image from "../components/image"
import Layout from "../components/layout"
import ProductList from '../components/ProductsList'
import SEO from "../components/seo"
import { useLanguage } from '../hooks'

const IndexPage = () => {
   const language = useLanguage()
  return (
  <Layout>
    <SEO title="Home" />
    
  return <>
    <Banner language={language}/>
    <ContentfulBanner />
    <Container>
      <ProductList language={language}/>
    </Container>
  </>
  </Layout>
  )
}

export default IndexPage
