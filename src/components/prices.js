import { filter, prop, propEq, props, reduce } from 'ramda'

export const insertDecimal = fractionDigits => num => Number((num / 100).toFixed(fractionDigits))

const formatCurrency = country => currency => amount =>
  new Intl.NumberFormat(country, { style: 'currency', currency }).format(amount)

export const getLocalPrices = country => prices => {
  const isCountry = propEq('country', country)
  const localPrices = filter(isCountry)(prices)
  const getValue = prop('value')
  return reduce((acc, item) => {
    const value = getValue(item)
    const [centAmount, currencyCode, fractionDigits] = props(['centAmount', 'currencyCode', 'fractionDigets'])(value)
    const amount = insertDecimal(fractionDigits)(centAmount)
    const formattedPrice = formatCurrency(country)(currencyCode)(amount)
    return { value, formattedPrice }
  }, {})(localPrices)
}

export const currencySymbols = {
  USD: '$', // US Dollar
  EUR: '€' // Euro
}
