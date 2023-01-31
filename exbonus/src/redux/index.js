import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

const initialState = {
  valor1: 0,
  valor2: 0,
  resultado: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SOMAR':
      return {
        ...state,
        resultado: state.valor1 + state.valor2,
      };
    case 'SUBTRAIR':
      return {
        ...state,
        resultado: state.valor1 - state.valor2,
      };
    case 'MULTIPLICAR':
      return {
        ...state,
        resultado: state.valor1 * state.valor2,
      };
    case 'DIVIDIR':
      return {
        ...state,
        resultado: state.valor1 / state.valor2,
      };

    case 'VALOR1':
      return {
        ...state,
        valor1: +action.valor1,
      };
    case 'VALOR2':
      return {
        ...state,
        valor2: +action.valor2,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

export default store;
