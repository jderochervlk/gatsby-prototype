import PropTypes from 'prop-types'
import { path } from 'ramda'
import React, { useMemo } from 'react'

import { useContentfulRequest } from '../hooks'
import { getCartDiscount } from './cartDiscounts'
import renderMaybe from './renderMaybe'
import Skeleton from './Skeleton'

const renderError = JSON.stringify

const renderEmpty = () => []

const renderDetails = language => x => {
  const description = path(['description', language])

  return <>
    <p>{description(x)}</p>
  </>
}

const renderContent = language => renderMaybe(renderEmpty)(renderDetails(language))

const CartDiscountDetails = ({ id, language }) => {
  const request = useMemo(() => getCartDiscount(id), [id])
  const [loading, error, discount] = useContentfulRequest(request)
  return <>
    {loading
      ? error
        ? renderError(error)
        : <Skeleton />
      : renderContent(language)(discount)
    }
  </>
}

CartDiscountDetails.propTypes = {
  id: PropTypes.string,
  language: PropTypes.string
}

export default CartDiscountDetails
