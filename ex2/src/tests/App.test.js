import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRedux from './helpers/renderWithRedux';

describe('Testando o componente App.js', () => {
  beforeEach(() => {
    renderWithRedux(<App />);
  });

  it('Testa se o titulo e os inputs estão na tela.', () => {
    const title = screen.getByTestId('title');
    const decrementBtn = screen.getByTestId('decrement-button');
    const counter = screen.getByTestId('counter');
    const incrementBtn = screen.getByTestId('increment-button');

    expect(title).toBeInTheDocument();
    expect(decrementBtn).toBeInTheDocument();
    expect(counter).toBeInTheDocument();
    expect(incrementBtn).toBeInTheDocument();
  });

  it('Testa se o botão de decremento está desabilitado se o valor do contador for 0, e se for maior ele deve estar habilitado.', () => {
    const decrementBtn = screen.getByTestId('decrement-button');
    const incrementBtn = screen.getByTestId('increment-button');

    expect(decrementBtn).toBeDisabled();

    userEvent.click(incrementBtn);

    expect(decrementBtn).not.toBeDisabled();
    userEvent.click(decrementBtn);
  });

  it('Testa se é possível incrementar e decrementar o valor do contador.', () => {
    const decrementBtn = screen.getByTestId('decrement-button');
    const counter = screen.getByTestId('counter');
    const incrementBtn = screen.getByTestId('increment-button');

    expect(counter).toHaveTextContent('0');

    userEvent.click(incrementBtn);

    expect(counter).toHaveTextContent('1');

    userEvent.click(decrementBtn);
    userEvent.click(decrementBtn);

    expect(counter).toHaveTextContent('0');
  });
});
