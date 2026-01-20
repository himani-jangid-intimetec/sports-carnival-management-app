import { useState } from 'react';
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from '../utils/validation';
import { validationMessages } from '../constants/validationMessages';

export const useRegisterViewModel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onRegister = (): boolean => {
    if (!name.trim()) {
      setError(validationMessages.REQUIRED_NAME);
      return false;
    }

    if (!isValidEmail(email)) {
      setError(validationMessages.REQUIRED_EMAIL);
      return false;
    }

    if (!isValidName(name)) {
      setError(validationMessages.NAME_ALPHA_ONLY);
      return false;
    }

    if (password.length < 8) {
      setError(validationMessages.PASSWORD_MIN_LENGTH);
      return false;
    }

    setError(null);
    return true;
  };

  const isFormValid =
    name.length > 0 &&
    isValidName(name) &&
    email.length > 0 &&
    isValidEmail(email) &&
    password.length > 0 &&
    isValidPassword(password);

  const validateName = () => {
    if (!name.trim()) {
      setNameError(validationMessages.REQUIRED_NAME);
    } else if (!isValidName(name)) {
      setNameError(validationMessages.NAME_ALPHA_ONLY);
    } else {
      setNameError('');
    }
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError(validationMessages.REQUIRED_EMAIL);
    } else if (!isValidEmail(email)) {
      setEmailError(validationMessages.INVALID_EMAIL);
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError(validationMessages.PASSWORD_MIN_LENGTH);
    } else if (!isValidPassword(password)) {
      setPasswordError(validationMessages.INVALID_PASSWORD);
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
    emailError,
  };
};
