import { DevicesType } from "../../redux/features/DeviceSlice";

const ListFakeDevices : DevicesType[] = [
    {
        id:'1', 
        name:'Máy bơm nước thô 1' , 
        listIdThongSo:[
           '1','2'
        ]
    },
    
    {
        id:'2', 
        name:'Máy bơm nước thô 2' , 
        listIdThongSo:[
           '1','3'
        ]
    },
    {
        id:'3', 
        name:'Trạm Biến Áp' , 
        listIdThongSo:[
            '4','5'
        ]
    },

]
export default ListFakeDevices;