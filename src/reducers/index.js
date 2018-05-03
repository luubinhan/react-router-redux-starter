import {combineReducers} from 'redux';
import session from './sessionReducer';

const INITIAL_STATE = {
  user: null
}

const entities = (state = INITIAL_STATE, action) => {
  return state;
}

const rootReducer = combineReducers({
  entities,
  session
});

export default rootReducer;
