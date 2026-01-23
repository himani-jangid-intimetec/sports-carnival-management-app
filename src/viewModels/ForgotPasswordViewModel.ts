import { useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validation';
import { validationMessages } from '../constants/validationMessages';

export const useForgotPasswordViewModel = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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
    if (!newPassword) {
      setPasswordError(validationMessages.REQUIRED_PASSWORD);
    } else if (newPassword.length < 8) {
      setPasswordError(validationMessages.PASSWORD_MIN_LENGTH);
    } else if (!isValidPassword(newPassword)) {
      setPasswordError(validationMessages.INVALID_PASSWORD);
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError(validationMessages.CONFIRM_PASSWORD);
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError(validationMessages.PASSWORD_MISMATCH);
    } else if (!isValidPassword(confirmPassword)) {
      setConfirmPasswordError(validationMessages.INVALID_PASSWORD);
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

  const isFormValid =
    email.length > 0 &&
    isValidEmail(email) &&
    newPassword.length >= 8 &&
    confirmPassword === newPassword &&
    isValidEmail(email) &&
    isValidPassword(newPassword) &&
    isValidPassword(confirmPassword);

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
