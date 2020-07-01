import { Just, Nothing } from 'crocks/Maybe'
import { graphql, useStaticQuery } from 'gatsby'
import React,{ useEffect, useState } from "react"

import ContentfulBanner from '../components/ContentfulBanner'
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <ContentfulBanner data={Just(data)} />
    </Layout>
  )
}

export const query = graphql`
      query {
        contentfulBanner {
                title
                richText {
                  json
                }
                headerImage {
                  title
                  fluid {
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                  }
                }
              }
      }
    `

export default IndexPage
 