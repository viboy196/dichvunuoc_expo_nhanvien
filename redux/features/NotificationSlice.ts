import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

export type NotificationType = {
  title: string;
  body: string;
  isClick: boolean;
  data: any;
  time: number;
};

export type NotificationsType = {
  expoToken?:string;
  isSend:boolean;
};
const initialState = {
  expoToken:undefined,
  isSend:false,
} as NotificationsType;

export const NotificationSlice = createSlice({
  name: 'notification',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStateNotification(
      state,
      action: PayloadAction<{input: NotificationsType}>,
    ) {
      state = {...state, expoToken:action.payload.input.expoToken};
      return state;
    },
  },
});

export const {
  setStateNotification,
} = NotificationSlice.actions;

const persistConfig = {
  key: 'root/notification',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, NotificationSlice.reducer);

