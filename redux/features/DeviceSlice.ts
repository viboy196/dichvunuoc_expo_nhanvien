import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';


export type ThongSoType = {
  id:string;
  name?: string;
  vale?:number;
  info?:string;
  unitType?:string;
}

export type DevicesType = {
  id:string;
  name?:string;
  listIdThongSo? : string[];
  info?:string;
  idModule?:string;
  
};

export type ListDeviceType = {
  listDevice?: DevicesType[];
};
const initialState = {
  listDevice:undefined
} as ListDeviceType;

export const DeviceSlice = createSlice({
  name: 'devices',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addDevice(state, action: PayloadAction<{item: DevicesType}>) {
      if(state.listDevice === undefined){
        state.listDevice = [action.payload.item];
        
      }else{
        const index = state.listDevice.findIndex(x => x.id === action.payload.item.id);
        if(index > -1){
         
        }
        else{
          state.listDevice.push(action.payload.item)
        }
      }
      return state;
    },
    updateDevice(state, action: PayloadAction<{item: DevicesType  }>) {
      if(state.listDevice === undefined){
  
       return state;
        
      }
      const index = state.listDevice.findIndex(
        it => it.id === action.payload.item.id,
      );
     if(index > -1){
      const arr = [
        ...state.listDevice.slice(0, index),
        action.payload.item,
        ...state.listDevice.slice(index + 1),
      ];
      state = {...state, listDevice: arr};
     }else{
     
     }
      return state;
    },
    removeDevice(state, action: PayloadAction<{id:string , }>) {
      if(state.listDevice === undefined){
      
       return state;
      }
      const arr = state.listDevice.filter(x => x.id !== action.payload.id)
      state = {...state, listDevice: arr}; 
      return state;

    },
    removeAllDevice(state) {
      
      state = {listDevice:undefined}; 
      return state;

    },

   
    setDevice(
      state,
      action: PayloadAction<{listDevice: Array<DevicesType>}>,
    ) {
      state = {...state, listDevice: action.payload.listDevice};
      return state;
    },
  },
});

export const {
  addDevice,
  updateDevice,
  removeDevice,
  setDevice,
  removeAllDevice
} = DeviceSlice.actions;
const persistConfig = {
  key: 'Devices',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig,DeviceSlice.reducer);
