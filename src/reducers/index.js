const INITIAL_STATE = {
  user: null
}

const entities = (state = initialState, action) => {
  return state;
}

const rootReducer = combineReducers({
  entities
});

export default rootReducer;
