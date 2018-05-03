import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'

class Authenticator extends Component {
  state = {
    showSignIn: true
  }
  switchState = (showSignIn) => {
    this.setState({showSignIn});
  }
  render() {
    const { showSignIn } = this.state;
    return (
      <div>
        {showSignIn ? <SignIn /> : <SignUp/>}
      </div>
    );
  }
}

export default withRouter(Authenticator);
