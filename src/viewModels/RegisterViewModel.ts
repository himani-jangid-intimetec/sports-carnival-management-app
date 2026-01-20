import { useMemo, useState } from 'react';
import { isValidEmail, isValidName } from '../utils/validation';
import { VALIDATION_MESSAGES } from '../constants/validationMessages';

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
      setError(VALIDATION_MESSAGES.REQUIRED_NAME);
      return false;
    }

    if (!isValidEmail(email)) {
      setError(VALIDATION_MESSAGES.REQUIRED_EMAIL);
      return false;
    }

    if (!isValidName(name)) {
      setError(VALIDATION_MESSAGES.NAME_ALPHA_ONLY);
      return false;
    }

    if (password.length < 6) {
      setError(VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH);
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
      setNameError(VALIDATION_MESSAGES.REQUIRED_NAME);
    } else if (!isValidName(name)) {
      setNameError(VALIDATION_MESSAGES.NAME_ALPHA_ONLY);
    } else {
      setNameError('');
    }
  };

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
    if (password.length < 6) {
      setPasswordError(VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH);
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
