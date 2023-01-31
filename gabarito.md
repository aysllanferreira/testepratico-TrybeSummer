
# Gabarito dos exercícios

## Exercício 01

Neste exercício já tínhamos tanto o código quanto o Redux já configurado, tanto pra aplicação quanto para os testes, pois foi o conteúdo que aprendemos na aula.

A nossa missão é conseguir 100% de cobertura nos testes do componente `App.js`, então precisamos criar os testes unitários lembrando de utilizar a função `renderWithRedux` para renderizar nosso *App*, uma vez que ele utiliza *Redux*.

**Pois então, aqui vai a solução.**

```javascript
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

```

## Exercício 02

Neste exercício recebemos um código que possui um contador, de forma que quando clicamos no botão +, ele soma 1 no contador. e quando clicamos no botão -, ele subtrai um do contador e também, caso o contador for igual a 0, é impossível clicar no botão subtrair, uma vez que estará desabilitado.

A aplicação já estava funcional, com o *Redux* devidamente configurado, porém temos que agora configurar o *Redux* para fazermos os testes, criando a função `renderWithRedux` e depois ainda testar a aplicação obtendo 100% de cobertura dos testes.

**Então vamos lá**

**Criando a função `renderWithRedux`*

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux';

const renderWithRedux = (component) => render(
  <Provider store={store}>{component}</Provider>,
);

export default renderWithRedux;

```

**Agora vamos testar a aplicação**

```javascript
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

```

## Exercício Bônus

Neste exercício recebemos um código que tem uma calculadora simples, que faz operações básicas de soma, subtração, multiplicação e divisão.

A aplicação já estava funcional, com o *Redux* devidamente configurado, porém temos que agora configurar o *Redux* para fazermos os testes, criando a função `renderWithRedux` e depois ainda testar a aplicação obtendo 100% de cobertura dos testes.

**Então vamos lá**

**Criando a função `renderWithRedux`*

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux';

const renderWithRedux = (component) => render(
  <Provider store={store}>{component}</Provider>,
);

export default renderWithRedux;
```

**Agora vamos testar a aplicação**

```javascript
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

```
