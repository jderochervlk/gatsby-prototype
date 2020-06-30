/* eslint-disable no-unused-vars */
import pipe from 'crocks/helpers/pipe'
import map from 'crocks/pointfree/map'
import { append, prop, props, reduce } from 'ramda'

import { commerceToolsClient, getResultsFromBody } from './commerceToolsClient'

const request = {
  uri: '/joshua-testing/products',
  method: 'GET'
}

export const parseProduct = x => {
  const id = prop('id')(x)
  const masterData = prop('masterData')(x)
  const published = prop('published')(masterData)
  const current = prop('current')(masterData)
  const [name, slug, description, masterVarient] = props(['name', 'slug', 'metaDescription', 'masterVariant'])(current)
  const [sku, images, prices, attributes] = props(['sku', 'images', 'prices', 'attributes'])(masterVarient)

  return {
    id,
    published,
    name,
    slug,
    description,
    sku,
    images,
    prices,
    attributes
  }
}

const reduceProducts = reduce((acc, x) => append(parseProduct(x), acc), [])

export const results = pipe(
  map(getResultsFromBody),
  map(reduceProducts)
)

export const getAllProducts = commerceToolsClient(request)(results)
