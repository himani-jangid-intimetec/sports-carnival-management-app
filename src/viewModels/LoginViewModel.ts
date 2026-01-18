import { useState } from 'react';
import { isValidEmail } from '../utils/validation';

export const useLoginViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>('');

  const onLogin = (): boolean => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }

    if (!isValidEmail(email)) {
      setError('Enter a valid email');
      return false;
    }

    setError(null);
    return true;
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
