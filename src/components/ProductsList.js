import { Button, Card, CardActions, CardHeader, CardMedia, CircularProgress, Grid } from '@material-ui/core'
import map from 'crocks/pointfree/map'
import PropTypes from 'prop-types'
import { head, path, pipe, prop, props } from 'ramda'
import React from 'react'

import { useContentfulRequest } from '../hooks'
import { getLocalPrices } from './prices'
import { getAllProducts } from './products'
import renderMaybe from './renderMaybe'

const renderProduct = language => x => {
  const title = path(['name', language])(x)
  const mainImageUrl = pipe(
    prop('images'),
    head,
    prop('url')
  )(x)
  const price = pipe(
    prop('prices'),
    getLocalPrices('GB'),
    prop('formattedPrice')
  )(x)

  return (
    <Grid item xs={12} sm={6} md={4} key={prop('id')(x)} style={{
      textAlign: 'left'
    }}>
      <Card>
        <CardMedia component='img' image={mainImageUrl} height='400'/>
        <CardHeader title={title} subheader={price}/>

        <CardActions>
          <Button size="small" color="primary">
            Buy
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

const renderProducts = language => products =>
  <Grid container spacing={3}>
    {map(renderProduct(language))(products)}
  </Grid>

const renderEmpty = __ => <p>There are no results</p>

const renderContent = language => renderMaybe(renderEmpty)(renderProducts(language))

const renderError = x => {
  const body = prop('body')(x)
  const [statusCode, message] = props(['statusCode', 'message'])(body)
  return <>
    <h1>Error: {statusCode}</h1>
    <p>{message}</p>
  </>
}

const ProductList = ({ language }) => {
  const [loading, error, products] = useContentfulRequest(getAllProducts)

  return (
    <>
      <h2>Products</h2>
      {loading
        ? error
          ? renderError(error)
          : <CircularProgress />
        : renderContent(language)(products)
      }
    </>
  )
}

ProductList.propTypes = {
  language: PropTypes.string
}

export default ProductList
