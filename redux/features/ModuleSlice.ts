import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';




export type ModuleType = {
  id:string;
  name:string;
  listIdDevice?:string[];
  info?:string;
  oder:number;
};

export type ListModuleType = {
  listModule?: ModuleType[];
  length:number;
};
const initialState = {
  listModule:undefined,
  length:0
} as ListModuleType;

export const ModulesSlice = createSlice({
  name: 'modules',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addModule(state, action: PayloadAction<{item: ModuleType}>) {
      if(state.listModule === undefined){
        state.listModule = [action.payload.item];
        
      }else{
        const index = state.listModule.findIndex(x => x.id === action.payload.item.id);
        if(index > -1){
         
        }
        else{
          state.listModule.push(action.payload.item)
          state.length++;
        }
      }
      return state;
    },
    updateModule(state, action: PayloadAction<{item: ModuleType  }>) {
      if(state.listModule === undefined){
  
       return state;
        
      }
      const index = state.listModule.findIndex(
        it => it.id === action.payload.item.id,
      );
     if(index > -1){
      const arr = [
        ...state.listModule.slice(0, index),
        action.payload.item,
        ...state.listModule.slice(index + 1),
      ];
      state = {...state, listModule: arr};
     }else{
     
     }
      return state;
    },
    removeModule(state, action: PayloadAction<{id:string , }>) {
      if(state.listModule === undefined){
      
       return state;
      }
      const arr = state.listModule.filter(x => x.id !== action.payload.id)
      state = {...state, listModule: arr , length:state.length--}; 
      return state;

    },
    removeAllModule(state) {
      
      state =initialState; 
      return state;

    },

   
    setModule(
      state,
      action: PayloadAction<{listModule: Array<ModuleType>}>,
    ) {
      state = {...state, listModule: action.payload.listModule};
      return state;
    },
  },
});

export const {
  addModule,
  updateModule,
  removeModule,
  setModule,
  removeAllModule
} = ModulesSlice.actions;
const persistConfig = {
  key: 'modules',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig,ModulesSlice.reducer);
