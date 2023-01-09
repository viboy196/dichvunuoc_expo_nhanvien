import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { LatLng } from 'react-native-maps';
import { persistReducer } from 'redux-persist';
import { PointType } from './PointsSlice';

export type TypePoint = 'điểm thu' | 'điểm nhà máy' | 'điểm trạm' | 'điểm van' | 'điểm đồng hồ tổng' | 'điểm đồng hồ hộ sử dụng';



export type LineType = {
  id:string;
  listIdConnect:string[];
  listLatLng: LatLng[];
  name?:string;
  type?:string;
  width?:number;
  color?:string;
};

export type ListLineType = {
  listLine?: LineType[];
};
const initialState = {
  listLine:undefined
} as ListLineType;

export const LineSlice = createSlice({
  name: 'Lines',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addLine(state, action: PayloadAction<{item: LineType}>) {
      if(state.listLine === undefined){
        state.listLine = [action.payload.item];
        
      }else{
        const index = state.listLine.findIndex(x => x.id === action.payload.item.id);
       const index1 = state.listLine.findIndex(x => x.id.indexOf(action.payload.item.listIdConnect[0]) > -1 && x.id.indexOf(action.payload.item.listIdConnect[1]) > -1 );
        if(index > -1 || index1 > -1){
         
        }
        else{
          state.listLine.push(action.payload.item)
        }
      }
      return state;
    },
    updateLine(state, action: PayloadAction<{item: LineType  }>) {
      if(state.listLine === undefined){
  
       return state;
        
      }
      const index = state.listLine.findIndex(
        it => it.id === action.payload.item.id,
      );
     if(index > -1){
      const arr = [
        ...state.listLine.slice(0, index),
        action.payload.item,
        ...state.listLine.slice(index + 1),
      ];
      state = {...state, listLine: arr};
     }else{
     
     }
      return state;
    },
    removeLine(state, action: PayloadAction<{id:string , }>) {
      if(state.listLine === undefined){
      
       return state;
      }
      const arr = state.listLine.filter(x => x.id !== action.payload.id)
      state = {...state, listLine: arr}; 
      return state;

    },
    removeAllLine(state) {
      
      state = {listLine:undefined}; 
      return state;

    },

   
    setLine(
      state,
      action: PayloadAction<{listLine: Array<LineType>}>,
    ) {
      state = {...state, listLine: action.payload.listLine};
      return state;
    },
  },
});

export const {
  addLine,
  updateLine,
  removeLine,
  setLine,
  removeAllLine
} = LineSlice.actions;
const persistConfig = {
  key: 'lines',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig,LineSlice.reducer);
