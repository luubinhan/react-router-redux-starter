import React, { Component } from 'react';
import {
  withRouter,
  Route,
  Redirect,
} from 'react-router-dom'

class PrivateRoute extends Component {
  state = {
    isAuthenticated: false
  }
  render() {
    const { component: Component, ...rest } = this.props;
    const {isAuthenticated} = this.state;
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/auth',
              }}
            />
          )
        }}
      />
    )
  }
}

export default withRouter(PrivateRoute);
