import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';

const configureStore = preloadedState => createStor(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, api)
)

export default configureStore;
