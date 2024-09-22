import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { authSelector, loginUserAsync } from '../../features/authSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const { error, success } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserAsync({ email: email, password: password }))
      .unwrap()
      .catch((error) => setErrorText(error as string));
  };

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (success) navigate(from);
    else if (!success) setErrorText(error as string);
  }, [error, success, navigate]);

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
