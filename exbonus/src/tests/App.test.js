import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRedux from './helpers/renderWithRedux';

describe('Teste da aplicação toda', () => {
  beforeEach(() => {
    renderWithRedux(<App />);
  });

  it('Teste se a página contém um título com o texto "Calculadora"', () => {
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Calculadora');
  });

  it('Teste se a página contém inputs de entrada para ambos os valores', () => {
    const valor1 = screen.getByTestId('valor1');
    const valor2 = screen.getByTestId('valor2');
    expect(valor1).toBeInTheDocument();
    expect(valor2).toBeInTheDocument();
  });

  it('Teste se a página contém botões de somar, subtrair, dividir e multiplicar e limpar', () => {
    const somar = screen.getByTestId('somar');
    const subtrair = screen.getByTestId('subtrair');
    const multiplicar = screen.getByTestId('multiplicar');
    const dividir = screen.getByTestId('dividir');
    const limpar = screen.getByTestId('limpar');

    expect(somar).toBeInTheDocument();
    expect(subtrair).toBeInTheDocument();
    expect(multiplicar).toBeInTheDocument();
    expect(dividir).toBeInTheDocument();
    expect(limpar).toBeInTheDocument();
  });

  it('Teste se é possível somar dois valores', () => {
    const valor1 = screen.getByTestId('valor1');
    const valor2 = screen.getByTestId('valor2');
    const somar = screen.getByTestId('somar');
    const clean = screen.getByTestId('limpar');

    userEvent.type(valor1, '1');
    userEvent.type(valor2, '2');
    userEvent.click(somar);

    const resultado = screen.getByTestId('resultado');

    expect(resultado).toHaveTextContent('3');
    userEvent.click(clean);
  });

  it('Teste se é possível subtrair dois valores', () => {
    const valor1 = screen.getByTestId('valor1');
    const valor2 = screen.getByTestId('valor2');
    const subtrair = screen.getByTestId('subtrair');
    const clean = screen.getByTestId('limpar');

    userEvent.type(valor1, '1');
    userEvent.type(valor2, '2');
    userEvent.click(subtrair);

    const resultado = screen.getByTestId('resultado');

    expect(resultado).toHaveTextContent('-1');
    userEvent.click(clean);
  });

  it('Teste se é possível multiplicar dois valores', () => {
    const valor1 = screen.getByTestId('valor1');
    const valor2 = screen.getByTestId('valor2');
    const multiplicar = screen.getByTestId('multiplicar');
    const clean = screen.getByTestId('limpar');

    userEvent.type(valor1, '1');
    userEvent.type(valor2, '2');
    userEvent.click(multiplicar);

    const resultado = screen.getByTestId('resultado');

    expect(resultado).toHaveTextContent('2');
    userEvent.click(clean);
  });

  it('Teste se é possível dividir dois valores', () => {
    const valor1 = screen.getByTestId('valor1');
    const valor2 = screen.getByTestId('valor2');
    const dividir = screen.getByTestId('dividir');
    const clean = screen.getByTestId('limpar');

    userEvent.type(valor1, '1');
    userEvent.type(valor2, '2');
    userEvent.click(dividir);

    const resultado = screen.getByTestId('resultado');

    expect(resultado).toHaveTextContent('0.5');
    userEvent.click(clean);
  });
});
