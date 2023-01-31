import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRedux from './helpers/renderWithRedux';

describe('Testa o componente App', () => {
  beforeEach(() => {
    renderWithRedux(<App />);
  });

  it('Testa se ao digitar um e-mail invalido, a mensagem de erro aparece na tela.', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailInput, 'teste');
    userEvent.type(usernameInput, 'teste');

    userEvent.click(submitButton);

    const errorMessage = screen.getByText(/e-mail inválido/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Testa se ao digitar um username com menos de 3 caracteres, a mensagem de erro aparece na tela.', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.click(submitButton);

    const errorMessage = screen.getByText(/o nome de usuário deve ter pelo menos 3 caracteres/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Testa se ao digitar um e-mail e um username validos, ambos aparecem na tela.', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(usernameInput, 'teste');

    userEvent.click(submitButton);

    const email = screen.getByText(/Email:teste@teste.com/i);
    const username = screen.getByText(/Username:teste/i);

    expect(email).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });
});
