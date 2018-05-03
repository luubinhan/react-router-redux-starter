import {browserHistory} from 'react-router-dom';

import * as types from '../actions/actionTypes';
import initState from './initialState';

export default function sessionReducer(state = initState.session, action) {
  switch (action.type) {
  case types.LOG_IN_SUCCESS:
    browserHistory.push('/');
    return !!sessionStorage.jwt;
  case types.LOG_OUT:
    browserHistory.push('/auth');
    return !!sessionStorage.jwt;
  default:
    return state;
  }
}
