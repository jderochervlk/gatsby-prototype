import { Link } from "gatsby"
import { graphql, useStaticQuery } from 'gatsby'
import React from "react"

import ContentfulBanner from '../components/ContentfulBanner'
import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
  <Layout>
    <SEO title="Home" />
    <ContentfulBanner />
  </Layout>
  )
}

export default IndexPage
 