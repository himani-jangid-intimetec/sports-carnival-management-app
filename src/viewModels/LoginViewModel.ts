import { useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validation';
import { validationMessages } from '../constants/validationMessages';

export const useLoginViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    if (!password.trim()) {
      setPasswordError(validationMessages.REQUIRED_PASSWORD);
    } else if (!isValidPassword(password)) {
      setPasswordError(validationMessages.INVALID_PASSWORD);
    } else {
      setPasswordError('');
    }
  };

  const onLogin = (): boolean => {
    validateEmail();
    validatePassword();

    return email.length > 0 && password.length > 0 && isValidEmail(email);
  };

  const isFormValid =
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) &&
    isValidPassword(password);

  return {
    email,
    password,
    setEmail,
    setPassword,
    emailError,
    passwordError,
    validateEmail,
    validatePassword,
    onLogin,
    isFormValid,
  };
};
