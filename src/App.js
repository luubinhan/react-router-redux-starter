import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Router from './Router'

import './App.css';

const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  return state;
}
const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

export default App;
