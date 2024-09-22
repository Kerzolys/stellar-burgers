import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { useSelector } from '../../services/store';
import { authSelector } from 'src/features/authSlice';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<Error | string | null>(null);

  const validatePassword = (password: string) => password.trim().length > 4;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError('Ваш пароль должен содержать больше 4 знаков');
      return;
    } else {
      setError(null);
    }

    if (!token.trim()) {
      setError('Введите код из письма');
      return;
    }

    setError(null);
    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error as string}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
