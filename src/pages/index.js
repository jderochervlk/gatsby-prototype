import React from "react"

import ContentfulBanner from '../components/ContentfulBanner'
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
 