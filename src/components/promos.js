import pipe from 'crocks/helpers/pipe'
import map from 'crocks/pointfree/map'
import { filter, head, prop, props, sortBy } from 'ramda'

import { commerceToolsClient, getResultsFromBody } from './commerceToolsClient'
import { currencySymbols, insertDecimal } from './prices'

const queryProductDiscountsRequest = {
  uri: '/joshua-testing/product-discounts',
  method: 'GET'
}

const filterActivePromos = filter(prop('isActive'))

const results = pipe(
  map(getResultsFromBody),
  map(filterActivePromos)
)

export const getActivePromos = commerceToolsClient(queryProductDiscountsRequest)(results)

const sortOrder = sortBy(prop('sortOrder'))

const sortAndGetFirst = pipe(
  sortOrder,
  head
)

export const getHighestRankedPromo = map(sortAndGetFirst)

const permyriadToPercent = x => `${x / 100}%`

const currencySymbol = x => currencySymbols[x] || `${x} `

const moneyString = ([fractionDigits, centAmount, currencyCode]) =>
  `${currencySymbol(currencyCode)}${insertDecimal(fractionDigits)(centAmount)}`

const formatMoney = pipe(
  head,
  props(['fractionDigits', 'centAmount', 'currencyCode']),
  moneyString
)

export const promoValue = x => {
  const permyriad = prop('permyriad')
  const money = prop('money')
  return permyriad(x) ? permyriadToPercent(permyriad(x)) : formatMoney(money(x))
}
