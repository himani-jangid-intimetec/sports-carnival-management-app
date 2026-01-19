import { useMemo, useState } from 'react';
import { isValidEmail } from '../utils/validation';

export const ForgotPasswordViewModel = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError('');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      return false;
    }

    setEmailError('');
    return true;
  };

  const isPasswordValid = newPassword.length >= 6;
  const doPasswordsMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const onSubmit = () => {
    if (!validateEmail()) return false;
    if (!isPasswordValid) return false;
    if (!doPasswordsMatch) return false;

    return true;
  };

  const isButtonDisabled = useMemo(() => {
    return (
      !email ||
      !emailError ||
      !newPassword ||
      !confirmPassword ||
      !isPasswordValid ||
      !doPasswordsMatch
    );
  }, [
    email,
    emailError,
    newPassword,
    confirmPassword,
    isPasswordValid,
    doPasswordsMatch,
  ]);

  return {
    email,
    newPassword,
    confirmPassword,
    emailError,
    isButtonDisabled,
    setEmail,
    setNewPassword,
    setConfirmPassword,
    validateEmail,
    onSubmit,
  };
};
