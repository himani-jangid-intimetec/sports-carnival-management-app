import { useMemo, useState } from 'react';
import { isValidEmail } from '../utils/validation';

export const useForgotPasswordViewModel = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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
    if (!newPassword) {
      setPasswordError('Password is required');
    } else if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
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
      newPassword.length >= 6 &&
      confirmPassword === newPassword
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
