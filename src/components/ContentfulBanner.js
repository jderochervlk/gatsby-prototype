/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { Container, Paper } from '@material-ui/core'
import { Just, Nothing } from 'crocks/Maybe'
import { flip, path, pipe, prop, props } from 'ramda'
import React, { useEffect, useState } from 'react'
import renderHTML from 'react-render-html'

import { getEntries, getEntry } from './contentfulClient'
import renderMaybe from './renderMaybe'

const document = flip(documentToReactComponents)

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const fields = path(['data', 'target', 'fields'])(node)
      const title = prop('title')(fields)
      const file = prop('file')(fields)
      const [url] = props(['url'])(file)
      return <img alt={title} title={title} src={url} style={{ width: '100%' }}/>
    }
  }
  // renderText: text => text.replace('!', '?')
}

const renderEntry = pipe(
  path(['fields', 'richText']),
  document(options)
)

const test = pipe(
  path(['fields', 'richText']),
  console.log
)

const renderContent = x => {
  const items = prop('items')(x)
  test(items)
  return <Paper style={{ padding: '1rem', textAlign: 'left' }}>
    {items && items.map(renderEntry)}
  </Paper>
}

const renderNothing = () => <p>No content available</p>

const render = renderMaybe(renderNothing)(renderContent)

const ContentfulBanner = () => {
  const [data, setData] = useState(Nothing())
  const [error, setError] = useState()
  useEffect(() => {
    getEntries(setError)(setData)
  }, [])
  return <Container>
    {JSON.stringify(error)}
    {render(data)}
  </Container>
}

export default ContentfulBanner
