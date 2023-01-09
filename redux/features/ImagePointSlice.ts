import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

export type TypePoint = 'điểm thu' | 'điểm nhà máy' | 'điểm trạm' | 'điểm van' | 'điểm đồng hồ tổng' | 'điểm đồng hồ hộ sử dụng';



export type ImagePointType = {
  idPoint:string;
  listImageUri?:string[];
};

export type ListPointType = {
  listImagePoint?: ImagePointType[];
};
const initialState = {
  listImagePoint:undefined
} as ListPointType;

export const PointsSlice = createSlice({
  name: 'ImagesPoint',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addImagePoint(state, action: PayloadAction<{item: ImagePointType}>) {
      if(state.listImagePoint === undefined){
        state.listImagePoint = [action.payload.item];
        
      }else{
        const index = state.listImagePoint.findIndex(x => x.idPoint === action.payload.item.idPoint);
        if(index > -1){
         
        }
        else{
          state.listImagePoint.push(action.payload.item)
        }
      }
      return state;
    },
    updateImagePoint(state, action: PayloadAction<{item: ImagePointType  }>) {
      if(state.listImagePoint === undefined){
  
       return state;
        
      }
      const index = state.listImagePoint.findIndex(
        it => it.idPoint === action.payload.item.idPoint,
      );
     if(index > -1){
      const arr = [
        ...state.listImagePoint.slice(0, index),
        action.payload.item,
        ...state.listImagePoint.slice(index + 1),
      ];
      state = {...state, listImagePoint: arr};
     }else{
     
     }
      return state;
    },
    removeImagePoint(state, action: PayloadAction<{id:string , }>) {
      if(state.listImagePoint === undefined){
      
       return state;
      }
      const arr = state.listImagePoint.filter(x => x.idPoint !== action.payload.id)
      state = {...state, listImagePoint: arr}; 
      return state;

    },
    removeAllImagePoint(state) {
      
      state = {listImagePoint:undefined}; 
      return state;

    },

   
    setImagePoint(
      state,
      action: PayloadAction<{listPoint: Array<ImagePointType>}>,
    ) {
      state = {...state, listImagePoint: action.payload.listPoint};
      return state;
    },
  },
});

export const {
  addImagePoint,
  updateImagePoint,
  removeImagePoint,
  setImagePoint,
  removeAllImagePoint
} = PointsSlice.actions;
const persistConfig = {
  key: 'Point',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig,PointsSlice.reducer);
