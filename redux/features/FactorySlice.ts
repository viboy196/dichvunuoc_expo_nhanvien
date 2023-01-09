import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';



export type FactoryType = {
  id:string;
  name:string;
  listIdModule?:string[];
};

export type ListFactoryType = {
  listFactory?: FactoryType[];
};
const initialState = {
  listFactory:undefined
} as ListFactoryType;

export const FactorySlice = createSlice({
  name: 'factory',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addFactory(state, action: PayloadAction<{item: FactoryType}>) {
      if(state.listFactory === undefined){
        state.listFactory = [action.payload.item];
        
      }else{
        const index = state.listFactory.findIndex(x => x.id === action.payload.item.id);
        if(index > -1){
         
        }
        else{
          state.listFactory.push(action.payload.item)
        }
      }
      return state;
    },
    updateFactory(state, action: PayloadAction<{item: FactoryType  }>) {
      if(state.listFactory === undefined){
  
       return state;
        
      }
      const index = state.listFactory.findIndex(
        it => it.id === action.payload.item.id,
      );
     if(index > -1){
      const arr = [
        ...state.listFactory.slice(0, index),
        action.payload.item,
        ...state.listFactory.slice(index + 1),
      ];
      state = {...state, listFactory: arr};
     }else{
     
     }
      return state;
    },
    removeFactory(state, action: PayloadAction<{id:string  }>) {
      if(state.listFactory === undefined){
      
       return state;
      }
      const arr = state.listFactory.filter(x => x.id !== action.payload.id)
      state = {...state, listFactory: arr}; 
      return state;

    },
    removeAllFactory(state) {
      
      state = {listFactory:undefined}; 
      return state;

    },

   
    setFactory(
      state,
      action: PayloadAction<{listFactory: Array<FactoryType>}>,
    ) {
      state = {...state, listFactory: action.payload.listFactory};
      return state;
    },
  },
});

export const {
  addFactory,
  updateFactory,
  removeFactory,
  setFactory,
  removeAllFactory
} = FactorySlice.actions;
const persistConfig = {
  key: 'factory',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig,FactorySlice.reducer);
