import {combineReducers} from 'redux';

// import notificationReducer from '../features/notification/NotificationSlice';

import authReducer from '../features/auth/authSlices';
import DeviceSlice from '../features/DeviceSlice';
import ImagePointSlice from '../features/ImagePointSlice';
import LineSlice from '../features/LineSlice';
import ModelSlides from '../features/ModelSlides';
import PointsSlice from '../features/PointsSlice';
import  ModulesSlice  from './../features/ModuleSlice';
import  NotificationSlice  from './../features/NotificationSlice';


export default combineReducers({
  auth: authReducer,
  points:PointsSlice,
  models:ModelSlides,
  lines:LineSlice,
  modules:ModulesSlice,
  devices:DeviceSlice,
  imagePoint:ImagePointSlice,
  noti:NotificationSlice

});
