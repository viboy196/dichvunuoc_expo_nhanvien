import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import ApiRequest from '../../../utils/api/Main/ApiRequest';
import jwt_decode from "jwt-decode";
export type UsersState = {
  token?: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorMessage?: string;
  userName?: string;
  password?: string;
  checkedAuth?: boolean;
  waterFactoryId?: string;
  waterUserId?:string;
  waterUserName?:string;
  UserId?:string;
};
const initialState = {
  loading: 'idle',
  token: undefined,
} as UsersState;
export const loginAsync = createAsyncThunk(
  'auth/login',
  // if you type your function argument here
  async (input: {phone: string; password: string}) => {
    return await ApiRequest.LoginApi(input);
  },
);
export const ChangeWaterFactory = createAsyncThunk(
  'auth/ChangeWaterFactory',
  // if you type your function argument here
  async (input: {userName: string; waterFactoryId: string; token: string , waterUserId:string , waterUserName:string}) => {
    return await ApiRequest.ChangeWaterFactory(input);
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state = {
        ...state,
        token: undefined,
        errorMessage: undefined,
        waterFactoryId: undefined,
        waterUserId:undefined,
        waterUserName:undefined,
        loading: 'idle',
      };
      return state;
    },
    addUserName(state, action: PayloadAction<{userName: string}>) {
      state = {
        ...state,
        userName: action.payload.userName,
      };
      return state;
    },
    setStateAuthRemember(state, action: PayloadAction<{input: UsersState}>) {
      const {userName , password , checkedAuth} = action.payload.input;
      if(checkedAuth){
        state = {
          ...state,
          userName: action.payload.input.userName,
          password: action.payload.input.password,
          checkedAuth: action.payload.input.checkedAuth,
        };
      }else{
        state = {
          ...state,
          userName: undefined,
          password:undefined,
          checkedAuth:checkedAuth,
        };
      }
     
      return state;
    },
    setState(state, action: PayloadAction<{input: UsersState}>) {
     
      state = {...state , ...action.payload.input}
     
      return state;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state = {...state, loading: 'pending'};
        return state;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log('loginAsync fulfilled', action.payload);
      
        if (action.payload.code === '00') {
          const decode =   jwt_decode(action.payload.result) as object;
          try{
            state = {
              ...state,
              loading: 'succeeded',
              token: action.payload.result,
              // @ts-ignore
              userName:decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
            };
          }catch{
            state = {
              ...state,
              loading: 'succeeded',
              token: action.payload.result,
            };
          }
          
        } else {
          state = {
            ...state,
            loading: 'failed',
            token: undefined,
            errorMessage: action.payload.errorMessage,
          };
        }
        return state;
      })
      .addCase(ChangeWaterFactory.fulfilled, (state, action ,) => {
        console.log('ChangeWaterFactory fulfilled', action.payload);
       
        if (action.payload.code === '00') {
          state = {
            ...state,
            loading: 'succeeded',
            token: action.payload.result,
            waterFactoryId:action.meta.arg.waterFactoryId,
            waterUserId:action.meta.arg.waterUserId,
            waterUserName:action.meta.arg.waterUserName
          };
        } else {
          state = {
            ...state,
            loading: 'failed',
            token: undefined,
            errorMessage: action.payload.errorMessage,
          };
        }
        return state;
      });
  },
});
export const {logOut, addUserName, setStateAuthRemember , setState} = authSlice.actions;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, authSlice.reducer);
