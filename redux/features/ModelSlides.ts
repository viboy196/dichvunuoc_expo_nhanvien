import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { TypePoint } from './PointsSlice';





export type ModelType = {
  id:string;
  type?:TypePoint
  name?:string,
};

export type ListModelType = {
  listData?: ModelType[];
};
const initialState = {
  listData:undefined
} as ListModelType;

export const ModelsSlice = createSlice({
  name: 'Models',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addModel(state, action: PayloadAction<{item: ModelType}>) {
      if(state.listData === undefined){
        state.listData = [action.payload.item];
        
      }else{
        const index = state.listData.findIndex(x => x.id === action.payload.item.id);
        if(index > -1){
         
        }
        else{
          state.listData.push(action.payload.item)
        }
      }
      return state;
    },
    updateModel(state, action: PayloadAction<{item: ModelType  }>) {
      if(state.listData === undefined){
  
       return state;
        
      }
      const index = state.listData.findIndex(
        it => it.id === action.payload.item.id,
      );
     if(index > -1){
      const arr = [
        ...state.listData.slice(0, index),
        action.payload.item,
        ...state.listData.slice(index + 1),
      ];
      state = {...state, listData: arr};
     }else{
     
     }
      return state;
    },
    removeModel(state, action: PayloadAction<{id:string , }>) {
      if(state.listData === undefined){
      
       return state;
      }
      const arr = state.listData.filter(x => x.id !== action.payload.id)
      state = {...state, listData: arr}; 
      return state;

    },
    removeAllModel(state) {
      
      state = {listData:undefined}; 
      return state;

    },

   
    setModel(
      state,
      action: PayloadAction<{listData: Array<ModelType>}>,
    ) {
      state = {...state, listData: action.payload.listData};
      return state;
    },
  },
});

export const {
  addModel,
  updateModel,
  removeModel,
  setModel,
  removeAllModel
} = ModelsSlice.actions;
const persistConfig = {
  key: 'Model',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig,ModelsSlice.reducer);
