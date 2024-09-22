import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {
  OnlyAuth,
  OnlyUnAuth,
  ProtectedRoute
} from '../protected-route/protected-route';
import { useDispatch, useSelector } from '../../services/store';
import { closeModal, modalSelector } from '../../features/modalSlice';
import { useEffect } from 'react';
import { authSelector, initializeAuth } from '../../features/authSlice';
import { getIngredientsAsync } from '../../features/burgerIngredientsSlice';

const App = () => {
  const modal = useSelector(modalSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(authSelector);
  console.log(isAuthenticated, user);

  const closeModalHander = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredientsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={
            // <ProtectedRoute>
            <OnlyAuth component={<ProfileOrders />} />

            // </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            modal.isModalOpen ? (
              <FeedOrderModal closeModalHandler={closeModalHander} />
            ) : null
          }
        />
        {
          <Route
            path='/ingredients/:id'
            element={
              modal.isModalOpen ? (
                <Modal onClose={closeModalHander} title='Детали ингредиента'>
                  <IngredientDetails />
                </Modal>
              ) : null
            }
          />
        }
        <Route
          path='/profile/orders/:number'
          element={
            modal.isModalOpen ? (
              <OnlyAuth
                component={
                  <FeedOrderModal closeModalHandler={closeModalHander} />
                }
              />
            ) : null
          }
        />
      </Routes>
    </div>
  );
};

const FeedOrderModal = ({
  closeModalHandler
}: {
  closeModalHandler: () => void;
}) => {
  const { number } = useParams<{ number: string }>();
  return (
    <Modal onClose={closeModalHandler} title={`${number}`}>
      <OrderInfo />
    </Modal>
  );
};

export default App;
