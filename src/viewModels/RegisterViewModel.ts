import { useMemo, useState } from 'react';
import { isValidEmail, isValidName } from '../utils/validation';

export const useRegisterViewModel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const onRegister = ():boolean => {
    if (!name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!isValidEmail(email)) {
      setError('Enter a valid email');
      return false;
    }

    if (!isValidName(name)) {
        setError('Name should contain only alphabets');
        return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    setError(null);
    return true;
  };

  const isFormValid = useMemo(() => {
    return (
        name.length > 0 && 
        isValidName(name) &&
        email.length > 0 &&
        isValidEmail(email) &&
        password.length > 0
    );
  }, [name, email, password]);

  const validateName = () => {
    if (!name.trim()) {
        setNameError('Name is required');
    } else if (!isValidName(name)) {
        setNameError('Name should contain only alphabets');
    } else {
        setNameError('');
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
        setEmailError('Email is required');
    } else if (!isValidEmail(email)) {
        setEmailError('Enter a valid email');
    } else {
        setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
    } else {
        setPasswordError('');
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
    isFormValid,
    validateName,
    validateEmail,
    validatePassword,
    nameError,
    passwordError,
    emailError
  };
};
