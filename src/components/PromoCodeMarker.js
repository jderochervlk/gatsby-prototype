import { Paper } from '@material-ui/core'
import blueGrey from '@material-ui/core/colors/blueGrey'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { useQuery } from '../hooks'

const Container = styled(Paper)`
    position: fixed;
    bottom: 0;
    right: 4rem;
    padding: 0.5rem;
    background: ${blueGrey[200]}
`

const PromoCodeMarker = () => {
  const query = useQuery()
  const code = query.get('code')
  return code ? <Container>Code {code} applied</Container> : []
}

PromoCodeMarker.propTypes = {
  code: PropTypes.string
}

export default PromoCodeMarker
