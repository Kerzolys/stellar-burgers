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
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  OnlyAuth,
  OnlyUnAuth,
  ProtectedRoute
} from '../protected-route/protected-route';
import { useDispatch, useSelector } from '../../services/store';
import { closeModal, modalSelector } from '../../features/modal/modalSlice';
import { useEffect } from 'react';
import { authSelector, initializeAuth } from '../../features/auth/authSlice';
import { getIngredientsAsync } from '../../features/burgerIngredients/burgerIngredientsSlice';

const App = () => {
  const modal = useSelector(modalSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state?.background;

  const { user } = useSelector(authSelector);

  const closeModalHander = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredientsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />

        {/* <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        /> */}
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={<FeedOrderModal closeModalHandler={closeModalHander} />}
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={closeModalHander} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth
                component={
                  <FeedOrderModal closeModalHandler={closeModalHander} />
                }
              />
            }
          />
        </Routes>
      )}
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
