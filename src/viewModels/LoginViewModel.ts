import { useMemo, useState } from 'react';
import { isValidEmail } from '../utils/validation';
import { VALIDATION_MESSAGES } from '../constants/validationMessages';

export const useLoginViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError(VALIDATION_MESSAGES.REQUIRED_EMAIL);
    } else if (!isValidEmail(email)) {
      setEmailError(VALIDATION_MESSAGES.INVALID_EMAIL);
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError(VALIDATION_MESSAGES.REQUIRED_PASSWORD);
    } else {
      setPasswordError('');
    }
  };

  const onLogin = (): boolean => {
    validateEmail();
    validatePassword();

    return email.length > 0 && password.length > 0 && isValidEmail(email);
  };

  const isFormValid = useMemo(() => {
    return email.length > 0 && password.length > 0 && isValidEmail(email);
  }, [email, password]);

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
