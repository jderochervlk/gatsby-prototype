import { CircularProgress, Paper } from '@material-ui/core'
import teal from '@material-ui/core/colors/teal'
import { formatRelative } from 'date-fns'
import PropTypes from 'prop-types'
import { path, prop } from 'ramda'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useContentfulRequest } from '../hooks'
import { getActivePromos, getHighestRankedPromo, promoValue } from './promos'
import renderMaybe from './renderMaybe'

const renderError = JSON.stringify

const renderActivePromo = language => x => {
  const name = path(['name', language])
  const description = path(['description', language])
  const value = prop('value')
  const formattedValue = promoValue(value(x))
  const endDate = prop('validUntil')
  const formattedDate = y => formatRelative(new Date(endDate(y)), new Date())
  return <PromoContainer>
    <h1>{name(x)}</h1>
    {value(x) && <h2>Save {formattedValue}</h2>}
    <p>{description(x)}</p>
    {endDate(x) && <p>Deal ends {(formattedDate(x))}</p>}
  </PromoContainer>
}

const renderEmpty = __ => []

const renderContent = language => renderMaybe(renderEmpty)(renderActivePromo(language))

const backgroundColor = teal[200]

const PromoContainer = styled(Paper)`
   background-color: ${backgroundColor};
   margin: 1rem;
   padding: 1rem;
`

const Banner = ({ language = 'en' }) => {
  const [loading, error, promos] = useContentfulRequest(getActivePromos)

  const promoToDisplay = useMemo(() => getHighestRankedPromo(promos), [promos])

  return <>
    { loading
      ? error
        ? renderError(error)
        : <CircularProgress />
      : renderContent(language)(promoToDisplay) }</>
}

Banner.propTypes = {
  language: PropTypes.string
}

export default Banner
