import React, { useState } from 'react';

const LoginForm = ({ toggleForm }) => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // Додано для виведення повідомлень

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginInput,  // передаємо email, але можна додати перевірку на username
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Login successful');  // Якщо успішно
      } else {
        setMessage(result.message || 'Login failed');  // Якщо помилка
      }
    } catch (error) {
      setMessage('Login failed: ' + error.message);  // Помилка під час запиту
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email or Username"
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}  {/* Виведення повідомлення */}
      <p onClick={toggleForm} className="toggle-link">
        Don't have an account? Register here.
      </p>
    </form>
  );
};

export default LoginForm;
