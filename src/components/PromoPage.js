import { Button, CircularProgress, Container, Grid, Paper } from '@material-ui/core'
import { head, path, pipe, prop, props } from 'ramda'
import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useContentfulRequest, useLanguage, useQuery } from '../hooks'
import CartDiscountDetails from './CartDiscountDetails'
import { getPromoCode } from './promoCode'
import { addToQuery } from './query'
import renderMaybe from './renderMaybe'

const PromoContainer = styled(Paper)`
  margin: 3rem;
  padding: 1rem;
`

const ButtonLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const renderPromo = language => query => x => {
  const name = path(['name', language])
  const description = path(['description', language])
  const code = prop('code')
  const cartDiscountId = pipe(
    prop('cartDiscounts'),
    head,
    prop('id')
  )
  const customFields = path(['custom', 'fields'])(x)

  const extraText1 = path(['extraText1', 'en'])(customFields)
  const imageLink1 = path(['image-link-1', 'en'])(customFields)
  const textBlock2 = path(['text-block-2', 'en'])(customFields)

  const updateQuery = addToQuery(`code=${code(x)}`)

  return <PromoContainer>
    <h1>{name(x)}</h1>
    <h2>Use promo code &quot;{code(x)}&quot;</h2>
    <CartDiscountDetails language={language} id={cartDiscountId(x)}/>
    <p>{description(x)}</p>
    <Button variant="contained" color="primary">
      <ButtonLink to={`/${updateQuery(query)}`}>Shop now!</ButtonLink>
    </Button>
    <Grid container spacing={2} style={{ marginTop: '1rem' }}>
      <Grid item xs={6} lg={4}>
        <h3>{extraText1}</h3>
      </Grid>
      <Grid item xs={6} lg={4}>
        <img src={imageLink1} style={{ width: '100%' }}/>
      </Grid>
      <Grid item xs={12} lg={4} style={{
        textAlign: 'left'
      }}>
        {textBlock2}
      </Grid>

    </Grid>

  </PromoContainer>
}

const renderEmpty = () => <p>No promos found for code :(</p>

const renderError = x => {
  const body = prop('body')(x)
  const [statusCode, message] = props(['statusCode', 'message'])(body)
  return <>
    <h1>Error: {statusCode}</h1>
    <p>{message}</p>
  </>
}

const renderContent = language => query => renderMaybe(renderEmpty)(renderPromo(language)(query))

const PromoPage = () => {
  const language = useLanguage()
  const query = useQuery()

  const { id } = useParams()

  const request = useMemo(() => getPromoCode(id), [id])

  const [loading, error, promo] = useContentfulRequest(request)

  return <Container>
    {loading
      ? error
        ? renderError(error)
        : <CircularProgress/>
      : renderContent(language)(query)(promo)}
  </Container>
}

export default PromoPage
