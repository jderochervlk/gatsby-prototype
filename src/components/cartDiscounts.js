import pipe from 'crocks/helpers/pipe'
import map from 'crocks/pointfree/map'
import { prop } from 'ramda'

// cart discounts
import { commerceToolsClient } from './commerceToolsClient'

const encodeId = x => encodeURIComponent(x)

const cartDiscountRequest = id => ({
  uri: `/joshua-testing/cart-discounts/${encodeId(id)}`,
  method: 'GET'
})

const getBody = prop('body')

const results = pipe(
  map(getBody)
//   map(getResultsFromBody)
//   map(head)
)

export const getCartDiscount = id => commerceToolsClient(cartDiscountRequest(id))(results)
