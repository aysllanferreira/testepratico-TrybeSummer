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
