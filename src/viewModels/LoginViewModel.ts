import { useState } from 'react';

export const useLoginViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }

    setError('');
  };

  return {
    email,
    password,
    error,
    onLogin,
    setEmail,
    setPassword,
  };
};
