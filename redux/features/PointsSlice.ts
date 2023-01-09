import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

export type TypePoint = 'Đồng hồ doanh nghiệp' | 'Đồng hồ hộ dân' |'Đồng hồ tổng nhánh'|'Đồng hồ tổng tuyến'|'điểm thu' | 'điểm nhà máy' | 'điểm trạm' | 'điểm van' ;



export type PointType = {
  id:string; // id Điểm
  latitude:number;
  longitude:number;
  name:string;
  listIdConnect?:string[]
  typePoint?:TypePoint;
  idConnect?:string;
  idParent?:string;
};

export type ListPointType = {
  listPoint?: PointType[];
};
const initialState = {
  listPoint:undefined
} as ListPointType;

export const PointsSlice = createSlice({
  name: 'devices',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addPoint(state, action: PayloadAction<{item: PointType}>) {
      if(state.listPoint === undefined){
        state.listPoint = [action.payload.item];
        
      }else{
        const index = state.listPoint.findIndex(x => x.id === action.payload.item.id);
        if(index > -1){
         
        }
        else{
          state.listPoint.push(action.payload.item)
        }
      }
      return state;
    },
    updatePoint(state, action: PayloadAction<{item: PointType  }>) {
      if(state.listPoint === undefined){
  
       return state;
        
      }
      const index = state.listPoint.findIndex(
        it => it.id === action.payload.item.id,
      );
     if(index > -1){
      const arr = [
        ...state.listPoint.slice(0, index),
        action.payload.item,
        ...state.listPoint.slice(index + 1),
      ];
      state = {...state, listPoint: arr};
     }else{
     
     }
      return state;
    },
    removePoint(state, action: PayloadAction<{id:string , }>) {
      if(state.listPoint === undefined){
      
       return state;
      }
      const arr = state.listPoint.filter(x => x.id !== action.payload.id)
      state = {...state, listPoint: arr}; 
      return state;

    },
    removeAllPoint(state) {
      
      state = {listPoint:undefined}; 
      return state;

    },

   
    setPoint(
      state,
      action: PayloadAction<{listPoint: Array<PointType>}>,
    ) {
      state = {...state, listPoint: action.payload.listPoint};
      return state;
    },
  },
});

export const {
  addPoint,
  updatePoint,
  removePoint,
  setPoint,
  removeAllPoint
} = PointsSlice.actions;
const persistConfig = {
  key: 'waterpipes',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig,PointsSlice.reducer);
