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
