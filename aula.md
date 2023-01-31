
# Introdução

## O que são testes em React-Redux?

Testes em ***React-Redux*** são testes de *software* que verificam se o código de uma aplicação ***React-Redux*** está funcionando corretamente. Esses testes podem incluir testes unitários, testes de integração, testes de componentes, entre outros. Eles ajudam a garantir a qualidade e a estabilidade do código ao longo do tempo, bem como ajudam a detectar erros ou problemas de maneira mais rápida.

## O que vamos aprender?

No dia de hoje, vamos aprender sobre como **testar uma aplicação** que utiliza a biblioteca do *Redux*. Ela é utilizada para ajudar no gerenciamento de estado e possui ampla adoção entre as pessoas que desenvolvem em *React*. Lembrando que o *React-Redux* é uma biblioteca que permite o gerenciamento do estado global da aplicação.

Para podermos testar aplicações que utilizam essa biblioteca é necessário aprendermos como configuramos nosso *setup* para começarmos a integrar nossos testes.

No dia de hoje, iremos testar nossa aplicação em *React* que utiliza ***React-Redux*** usando o RTL (*React testing library*).


### Você será capaz de:
- Utilizar *Reducers*, *Actions*, e a função `dispatch()` para atualizar o *store* do ***Redux***;
- Testar a aplicação que utiliza ***React-Redux*** de forma eficaz;

## Por que isso é importante?

Testar uma aplicação em ***React-Redux*** é importante para garantir a qualidade, estabilidade e confiança na aplicação ao longo do tempo.

- Melhora a qualidade do código: Testar o código ajuda a garantir que ele está funcionando corretamente e sem erros, o que melhora a qualidade geral da aplicação.
- Detecta erros rapidamente: Testar o código também ajuda a detectar erros ou problemas rapidamente, o que pode ser crucial para evitar problemas futuros.
- Facilita a manutenção: Ao testar o código, é possível identificar e corrigir problemas antes que eles se tornem difíceis de resolver. Isso facilita a manutenção do código ao longo do tempo.
- Melhora a confiança: Testar o código também ajuda a aumentar a confiança dos desenvolvedores e equipes na aplicação, pois eles podem ter certeza de que ela está funcionando corretamente.
- Ajuda a verificar a funcionalidade: Testar a aplicação com RTL permite verificar se ela está funcionando da maneira esperada, simulando como um usuário real interage com a aplicação.
# Configurando o Redux no React

Na aula de hoje vamos testar nossa aplicação que utiliza o ***React-Redux***, portanto primeiramente precisamos configurar o *Redux*.

Embora seja algo que **já aprendemos anteriormente**, vamos passar rapidamente por aqui uma forma rápida de deixar tudo certo para podermos fazer nossa atividade de hoje.

**O primeiro passo é criar a aplicação React:**

```bash
npx create-react-app my-app
```

**Depois, instalamos as dependências que iremos utilizar nessa aula:**

```bash
npm install redux react-redux 
```

**O próximo passo iremos configurar o nosso store, para isso:**

- Crie uma pasta chamada `tests` como filho da pasta `src`.
- Arraste o arquivo `App.test.js` para dentro da pasta `tests`.
- Crie uma pasta chamada `redux` como filho da pasta `src`.
- Então crie o arquivo `index.js` para podermos configurar nosso store.
- Vamos instalar agora o `Redux Devtools` para  conseguirmos visualizar as informações do nosso estado global.

```bash
npm install --save @redux-devtools/extension
```

- Agora vamos configurar nosso *store* de acordo com o que vamos usar nesse exemplo.
- Para isso abra o arquivo `index.js` que está na pasta `redux`.
- Copie e cole o seguinte código, para configurar o *store*.

```javascript
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

```

- Agora vamos configurar o nosso *Provider* no arquivo `index.js` na pasta `src`.
- Copie e cole o seguinte código para configurar o *Provider*.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

```

- Com isso já configurado, vamos agora configurar o nosso `App.js` para termos finalmente uma página para testar que utiliza o *React-Redux*.
- Copie e Cole esse código no `App.js` que está na pasta `src`.

```javascript
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const verifyDataInput = (email, username) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email.value)) {
      setError({
        status: true,
        message: 'E-mail inválido.',
      });
      return true;
    }

    if (username.value.length < 3) {
      setError({
        status: true,
        message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
      });
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, username } = e.target.elements;

    if (verifyDataInput(email, username)) return;

    dispatch({
      type: 'SET_USER',
      payload: {
        email: email.value,
        username: username.value,
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
          />
        </label>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      {user.email && user.username ? (
        <div>
          <p>
            Email:
            {user.email}
          </p>
          <p>
            Username:
            {user.username}
          </p>
        </div>
      ) : (
        <div>
          {error.status && (
            <p>
              {error.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

```

Visto que já **aprendemos a utilizar componentes funcionais e hooks**, faça uma **análise do código** e também **rode** um `npm start` para entender sua funcionalidade, para aí sim estarmos prontos para finalmente começarmos a testar essa aplicação.
Não é o máximo ? 

**Divirta-se!**
# Testando o Redux

## Como fazer?

Para testarmos uma aplicação em *React*, nós primeiramente precisamos criar uma função que fará o *render* do nosso *APP* nos testes utilizando o *Redux*. 
Portanto, vamos criar a função `renderWithRedux()` para tornar isso possível.

- No nosso projeto, dentro da pasta `tests`, crie uma nova pasta chamada `helpers`, que é onde guardaremos a função que fará o *render* do nosso *App* nos testes.
- Agora crie o arquivo `renderWithRedux.js` nessa pasta `helpers`.

## Criando a função

Para criar a função que renderizará o nosso component com Redux nos testes, precisamos que:
- Nossa função receba como parâmetro um componente que deverá ser renderizado com o *Redux*.
- Que o *render* desse componente seja feito com o `render`da biblioteca de testes.
- Nosso componente deve estar aninhado dentro da *store* do nosso *Redux*.

**Para isso, criamos a seguinte função.**

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

Com isso, sempre que chamarmos essa função passando como argumento um componente *React*, ele será então renderizado nos testes já com o nosso *store* do *Redux* aplicado nele e assim estaremos já aptos a fazer os primeiros testes utilizando *React-Redux*.
# Vamos praticar!

## Exercício 01

Agora que já temos tudo pronto pra começar os testes, o primeiro desafio será obter 100% de cobertura no componente `App.js`. 

Para isso, acesso o arquivo `App.test.js` que está na pasta `tests` e desenvolva os testes utilizando a função `renderWithRedux` que criamos anteriormente para renderizar o componente `App.js`.

**Para testar a cobertura dos testes, rode no seu terminal o comando.**

```bash
npm test -- --coverage
```

**Arrasa!!!**

## Exercício 02

Agora, vamos colocar em prática o que aprendemos, vamos configurar o nosso ambiente de testes e novamente conseguir 100% de cobertura no nosso componente `App.js`.

**Neste exercício vamos testar um contador que utiliza *Redux!***

**Para testar a cobertura dos testes, rode no seu terminal o comando.**

```bash
npm test -- --coverage
```

**Primeiramente vamos criar o nosso app para esse exercício.**

- Rode em seu terminal:

```bash
npx-create-react-app ex2
```

- Agora instale as dependências que iremos usar:

```bash
npm install redux react-redux
npm install --save @redux-devtools/extension
```

- Agora vamos criar o nosso *redux*.
- Crie a pasta `redux` e dentro dela crie o arquivo `index.js`.
- E insira o código abaixo para configurar o nosso contador.

```javascript
import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

export default store;

```

- Agora vamos configurar nosso *Provider*, na pasta `src` entre no arquivo `index.js`.
- Agora insira o código abaixo para configurar nosso *Redux*.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

- Por fim, vamos configurar o nosso `App.js` para nosso contador funcionar! =D
- Insira o código abaixo no `App.js`.

```javascript
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const [isDisabled, setIsDisabled] = useState(true);
  const { counter } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (counter > 0) setIsDisabled(false);
    else setIsDisabled(true);
  }, [counter]);

  return (
    <div>
      <h1 data-testid="title">
        Contador
      </h1>

      <button
        data-testid="decrement-button"
        type="button"
        disabled={isDisabled}
        onClick={() => { dispatch({ type: 'DECREMENT' }); }}
      >
        -
      </button>

      <span data-testid="counter">
        {counter}
      </span>

      <button
        data-testid="increment-button"
        type="button"
        onClick={() => dispatch({ type: 'INCREMENT' })}
      >
        +
      </button>
    </div>
  );
}

export default App;

```

**Agora é com você!!!** Rode um `npm test` e analise o código proposto para desenvolver os testes. 

Tendo nosso projeto já configurado, agora você precisará criar os testes da forma que aprendemos!

- Crie a função `renderWithRedux`.
- Desenvolva os testes para o componente `App.js`.
- Garanta 100% de cobertura no componente `App.js`

**Boa sorte!**

## Exercício Bônus

Neste exercício bônus nossa missão é tambem conseguir 100% de cobertura nos testes, mas dessa vez o exemplo usado será de uma calculadora que faz operações simples de Soma, subtração, multiplicação e divisão.

Para podermos começar o nosso exercício precisamos criar o nosso app e também aplicar o código para o exercício proposto, então vamos lá.

**Para testar a cobertura dos testes, rode no seu terminal o comando.**

```bash
npm test -- --coverage
```

**Primeiramente vamos criar o nosso app para esse exercício.**

- Rode em seu terminal:

```bash
npx-create-react-app exbonus
```

- Agora instale as dependências que iremos usar:

```bash
npm install redux react-redux
npm install --save @redux-devtools/extension
```

- Agora vamos criar o nosso redux.
- Crie a pasta `redux` e dentro dela crie o arquivo `index.js`.
- E insira o código abaixo para configurar o nosso contador.

```javascript
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
```

- Agora vamos configurar nosso *Provider*, na pasta `src` entre no arquivo `index.js`.
- Agora insira o código abaixo para configurar nosso Redux.

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

- Por fim, vamos configurar o nosso `App.js` para nosso contador funcionar! =D
- Insira o código abaixo no `App.js`.

```javascript
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const { valor1, valor2, resultado } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isAnswered, setIsAnswered] = useState(false);

const handleCalculo = ({ target }) => {
    const { id } = target;

    if (id === 'somar') {
      dispatch({ type: 'SOMAR' });
      setIsAnswered(true);
    }

    if (id === 'subtrair') {
      dispatch({ type: 'SUBTRAIR' });
      setIsAnswered(true);
    }

    if (id === 'multiplicar') {
      dispatch({ type: 'MULTIPLICAR' });
      setIsAnswered(true);
    }

    if (id === 'dividir') {
      dispatch({ type: 'DIVIDIR' });
      setIsAnswered(true);
    }
  };

  return (
    <div>
      <h1 data-testid="title">Calculadora</h1>

      <input
        data-testid="valor1"
        type="number"
        onChange={(e) => dispatch({ type: 'VALOR1', valor1: e.target.value })}
        value={valor1}
      />

      <input
        data-testid="valor2"
        type="number"
        onChange={(e) => dispatch({ type: 'VALOR2', valor2: e.target.value })}
        value={valor2}
      />

      <button
        type="button"
        data-testid="somar"
        id="somar"
        onClick={handleCalculo}
      >
        Somar
      </button>

      <button
        type="button"
        data-testid="subtrair"
        id="subtrair"
        onClick={handleCalculo}
      >
        Subtrair
      </button>

      <button
        type="button"
        data-testid="multiplicar"
        id="multiplicar"
        onClick={handleCalculo}
      >
        Multiplicar
      </button>

      <button
        type="button"
        data-testid="dividir"
        id="dividir"
        onClick={handleCalculo}
      >
        Dividir
      </button>

      <button
        type="button"
        data-testid="limpar"
        onClick={() => {
          dispatch({ type: 'VALOR1', valor1: 0 });
          dispatch({ type: 'VALOR2', valor2: 0 });
          dispatch({ type: 'SOMAR' });
          setIsAnswered(false);
        }}
      >
        Limpar
      </button>

      {isAnswered && (
        <p data-testid="resultado">
          {resultado}
        </p>
      )}
    </div>
  );
}

export default App;
```

**Agora é com você!!!** Rode um `npm test` e analise o código proposto para desenvolver os testes. 

Lembrando que novamente estamos usando *React-Redux*, então precisamos configurar a nossa função `renderWihRedux` para podermos testar a aplicação e conseguir cobrir 100% do nosso componente `App.js`.

- Crie a função `renderWithRedux`.
- Desenvolva os testes para o componente `App.js`.
- Garanta 100% de cobertura no componente `App.js`

**Boa sorte!** 
# Recursos adicionais (opcional)

[Testes em React-Redux](https://dev.to/gabrielhsilvestre/testes-em-react-redux-1h30#:~:text=Para%20testarmos%20aplica%C3%A7%C3%B5es%20em%20Redux,caso%20do%20Redux%2C%20renderWithRedux()%20.)

[React Unit Test Handbook + Redux Testing Toolkit](https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react-redux/)
