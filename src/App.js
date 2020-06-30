import './App.scss'

import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import ErrorBoundary from './ErrorBoundary'
import Home from './Home'
import Navigation from './Navigation'
import PromoCodeMarker from './PromoCodeMarker'
import PromoPage from './PromoPage'

const App = () =>
  <>
    <Router>
      <CssBaseline />
      <div className='App'>
        <Navigation/>
        <Switch>
          <Route exact path='/'>
            <ErrorBoundary>
              <Home/>
            </ErrorBoundary>
          </Route>

          <Route path='/:id'>
            <ErrorBoundary>
              <PromoPage />
            </ErrorBoundary>
          </Route>
        </Switch>
        <ErrorBoundary>
          <PromoCodeMarker/>
        </ErrorBoundary>
      </div>
    </Router>
  </>

export default App
