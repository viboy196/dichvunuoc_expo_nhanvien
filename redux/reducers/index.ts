import {combineReducers} from 'redux';

// import notificationReducer from '../features/notification/NotificationSlice';

import authReducer from '../features/auth/authSlices';
import ModelSlides from '../features/ModelSlides';
import PointsSlice from '../features/PointsSlice';

export default combineReducers({
  auth: authReducer,
  points:PointsSlice,
  models:ModelSlides
});
