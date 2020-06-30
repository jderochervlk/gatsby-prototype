import { AppBar, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const Navigation = () => {
  return <AppBar position='static'>
    <Toolbar>
      <Button><ButtonLink to='/'>Home</ButtonLink></Button>
      <Button><ButtonLink to='/podcast'>Example Promo</ButtonLink></Button>
    </Toolbar>
  </AppBar>
}

export default Navigation
