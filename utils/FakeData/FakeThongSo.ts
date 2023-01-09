import { DevicesType, ThongSoType } from "../../redux/features/DeviceSlice";

const ListFakeThongSos : ThongSoType[] = [
    {
        id:'1', 
        name:'Tổng số ngày chạy' ,
        vale:24,
        unitType:'Ngày'    
    },
    
    {
        id:'2', 
        name:'Tổng số giờ chạy' ,
        vale:192,
        unitType:'giờ'    
    },
    {
        id:'3', 
        name:'Thời gian Hoạt Đồng trong ngày' ,
        vale:12,
        unitType:'giờ/ngày'    
    },
    
    {
        id:'4', 
        name:'Tính hiệu điều khiển' ,
        vale:1,
    },
    {
        id:'5', 
        name:'Tính hiệu phản hồi' ,
        vale:1,
    },


    

]
export default ListFakeThongSos;