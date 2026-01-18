import { useState } from 'react';
import { isValidEmail } from '../utils/validation';

export const useRegisterViewModel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>('');

  const onRegister = (): boolean => {
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }

    if (isValidEmail(email)) {
      setError('Enter a valid email');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    setError(null);
    return true;
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
