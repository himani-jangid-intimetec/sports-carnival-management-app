import { useState } from 'react';

export const useRegisterViewModel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!email.includes('@')) {
      setError('Enter a valid email');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    setError('');
    return true;
  };

  const onRegister = () => {
    if (!validate()) {
      return;
    }
  };

  return {
    name,
    email,
    error,
    password,
    setName,
    setEmail,
    setPassword,
    onRegister,
  };
};
