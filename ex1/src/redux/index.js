import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

const initialState = {
  email: '',
  username: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

export default store;
