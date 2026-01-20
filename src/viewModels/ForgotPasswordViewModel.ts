import { useMemo, useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validation';
import { VALIDATION_MESSAGES } from '../constants/validationMessages';

export const useForgotPasswordViewModel = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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
    if (!newPassword) {
      setPasswordError(VALIDATION_MESSAGES.REQUIRED_PASSWORD);
    } else if (newPassword.length < 8) {
      setPasswordError(VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH);
    } else if (!isValidPassword(newPassword)) {
      setPasswordError(VALIDATION_MESSAGES.INVALID_PASSWORD);
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError(VALIDATION_MESSAGES.CONFIRM_PASSWORD);
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError(VALIDATION_MESSAGES.PASSWORD_MISMATCH);
    } else if (!isValidPassword(confirmPassword)) {
      setConfirmPasswordError(VALIDATION_MESSAGES.INVALID_PASSWORD);
    } else {
      setConfirmPasswordError('');
    }
  };

  const onSubmit = (): boolean => {
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (emailError || passwordError || confirmPasswordError) {
      return false;
    }

    return true;
  };

  const isFormValid = useMemo(() => {
    return (
      email.length > 0 &&
      isValidEmail(email) &&
      newPassword.length >= 8 &&
      confirmPassword === newPassword &&
      isValidEmail(email) &&
      isValidPassword(newPassword) &&
      isValidPassword(confirmPassword)
    );
  }, [email, newPassword, confirmPassword]);

  return {
    email,
    newPassword,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    setEmail,
    setNewPassword,
    setConfirmPassword,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    onSubmit,
    isFormValid,
  };
};
