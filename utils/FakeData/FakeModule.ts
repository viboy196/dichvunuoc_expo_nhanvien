import { DevicesType } from "../../redux/features/DeviceSlice";
import { ModuleType } from "../../redux/features/ModuleSlice";

const ListFakeModules : ModuleType[] = [
    {
        id:'1', 
        name:'Trạm thu' , 
        oder:1,
        listIdDevice:['1','2','3'],
        info:'Trạm lấy nước thô'
    },
    {
        id:'2', 
        name:'Hồ sơ lắng' , 
        oder:2,
        listIdDevice:[]
    },
    {
        id:'3', 
        name:'Trạm bơm chuyển tiếp' , 
        oder:3,
        listIdDevice:['1','2','3']
    },
    {
        id:'4', 
        name:'Bể phèn' , 
        oder:4,
        listIdDevice:['1','2','3']
    },
    {
        id:'5', 
        name:'Bơm Phèn' , 
        oder:5,
        listIdDevice:['1','2','3']
    },
    {
        id:'6', 
        name:'Bể Clo' , 
        oder:6,
        listIdDevice:['1','2','3']
    },
    {
        id:'7', 
        name:'Bơm Clo' , 
        oder:7,
        listIdDevice:['1','2','3']
    },
    {
        id:'8', 
        name:'Trung hòa clo' , 
        oder:8,
        listIdDevice:['1','2','3']
    },
    {
        id:'9', 
        name:'Module Khuấy' , 
        oder:9,
        listIdDevice:['1','2','3']
    },
    {
        id:'10', 
        name:'Module Lắng' , 
        oder:10,
        listIdDevice:['1','2','3']
    },
    {
        id:'11', 
        name:'Module lọc' , 
        oder:11,
        listIdDevice:['1','2','3']
    },
    {
        id:'12', 
        name:'Bể nước sạch' , 
        oder:12,
        listIdDevice:['1','2','3']
    },
    {
        id:'13', 
        name:'Trạm bơm nước sạch' , 
        oder:13,
        listIdDevice:['1','2','3']
    },

]
export default ListFakeModules;