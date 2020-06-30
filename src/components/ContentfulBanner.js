/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { Container, Paper } from '@material-ui/core'
import { Just, Nothing } from 'crocks/Maybe'
import { graphql, useStaticQuery } from 'gatsby'
import { flip, path, pipe, prop, props } from 'ramda'
import React, { useEffect, useState } from 'react'
import renderHTML from 'react-render-html'

import { getEntries, getEntry } from './contentfulClient'
import renderMaybe from './renderMaybe'

const document = flip(documentToReactComponents)

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      console.log(103, node)
      const fields = path(['data', 'target', 'fields'])(node)
      const title = prop('title')(fields)
      const file = path(['file', 'en-US'])(fields)
      const [url] = props(['url'])(file)
      console.log({url, title, file})
      return <img alt={title} title={title} src={url} style={{ width: '100%' }}/>
    }
  }
  // renderText: text => text.replace('!', '?')
}

const renderEntry = pipe(
  path(['richText', 'json']),
  document(options)
)

const test = pipe(
  path(['fields', 'richText']),
  console.log
)

const renderContent = x => {
  const entry = prop('contentfulBanner')
  return <Paper style={{ padding: '1rem', textAlign: 'left' }}>
    {renderEntry(entry(x))}
  </Paper>
}

const renderNothing = () => <p>No content available</p>

const render = renderMaybe(renderNothing)(renderContent)

const ContentfulBanner = () => {
  const [data, setData] = useState(Nothing())
  const [error, setError] = useState()

  const contentfulData = 
    useStaticQuery(graphql`
      query {
        contentfulBanner {
                title,
                richText {
                  json
                }
        }
      }
  `)

  useEffect(() => {
    setData(Just(contentfulData))
  }, [contentfulData])
  
  return <Container>
    {JSON.stringify(error)}
    {render(data)}
  </Container>
}

export default ContentfulBanner
