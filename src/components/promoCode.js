/* eslint-disable no-unused-vars */
import { Just, Nothing } from 'crocks/core/Maybe'
import pipe from 'crocks/helpers/pipe'
import safe from 'crocks/Maybe/safe'
import chain from 'crocks/pointfree/chain'
import concat from 'crocks/pointfree/concat'
import map from 'crocks/pointfree/map'
import isDefined from 'crocks/predicates/isDefined'
import { head, path } from 'ramda'

import commerceToolsClient from './commerceToolsClient'

const encodeCode = id => encodeURIComponent(`code="${id}"`)

const promoCodeById = id => ({
  uri: `/joshua-testing/discount-codes?where=${encodeCode(id)}`,
  method: 'GET'
})

const getResultsFromBody = pipe(
  path(['body', 'results']),
  safe(isDefined)
)

const firstItem = pipe(
  head,
  safe(isDefined)
)

const results = pipe(
  chain(getResultsFromBody),
  chain(firstItem)
)

export const getPromoCode = id => commerceToolsClient(promoCodeById(id))(results)
