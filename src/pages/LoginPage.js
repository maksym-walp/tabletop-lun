import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/Login.css';

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <div className="login-container">
      {isRegistering ? (
        <RegisterForm toggleForm={toggleForm} />
      ) : (
        <LoginForm toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default LoginPage;
