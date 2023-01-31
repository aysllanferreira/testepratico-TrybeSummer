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
