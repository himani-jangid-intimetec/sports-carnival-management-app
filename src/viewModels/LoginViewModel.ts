import { useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validation';
import { validationMessages } from '../constants/validationMessages';
import { useAuthStore } from '../store/AuthStore';

export const useLoginViewModel = () => {
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setEmailError(validationMessages.REQUIRED_EMAIL);
      return false;
    } else if (!isValidEmail(email)) {
      setEmailError(validationMessages.INVALID_EMAIL);
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (): boolean => {
    if (!password.trim()) {
      setPasswordError(validationMessages.REQUIRED_PASSWORD);
      return false;
    } else if (!isValidPassword(password)) {
      setPasswordError(validationMessages.INVALID_PASSWORD);
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const onLogin = async (): Promise<boolean> => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) return false;

    const success = await login(email, password);

    if (!success) {
      setPasswordError(validationMessages.INVALID_CREDENTIALS);
      return false;
    }

    return true;
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
