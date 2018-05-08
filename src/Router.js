import React from 'react'
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import {
  FourZeroFour,
  FourZeroThree,
  FiveHundred,
  Authenticator,
  Home
} from './screens'

import PrivateRoute from './components/PrivateRoute';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/auth' component={Authenticator} />
      <Route exact path="/404" component={FourZeroFour}/>
      <Route exact path="/403" component={FourZeroThree}/>
      <Route exact path="/500" component={FiveHundred}/>
      <PrivateRoute path='/private' component={Authenticator} />
      <Route path='*' component={FourZeroFour} />
    </Switch>
  </Router>
)

export default Routes
