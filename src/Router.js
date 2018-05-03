import React from 'react'
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'

import {
  FourZeroFour,
  FourZeroThree,
  FiveHundred,
  Authenticator
} from './screens'

class PrivateRoute extends React.Component {
  state = {
    loaded: false,
    isAuthenticated: false
  }
  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded , isAuthenticated} = this.state;
    if (!loaded) return null
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/auth",
              }}
            />
          )
        }}
      />
    )
  }
}

PrivateRoute = withRouter(PrivateRoute)

const Routes = () => (
  <Router>
    <Switch>
      <Route path='/auth' component={Authenticator} />
      <Route exact path="/404" component={FourZeroFour}/>
      <Route exact path="/403" component={FourZeroThree}/>
      <Route exact path="/500" component={FiveHundred}/>
      <PrivateRoute path='/' component={FiveHundred} />
    </Switch>
  </Router>
)

export default Routes
