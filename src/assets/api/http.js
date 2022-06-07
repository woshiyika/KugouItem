import axios from "axios";

// 创建axios实例化
// http://192.168.45.1:3000/banner
const service = axios.create({
    baseURL: "",
    timeout: 30000, //请求超时时间
    headers: {
        "Content-Type": "application/json;charset=UTF-8" //表单数据传递转化
    },
    withCredentials: true, //自动添加服务器提供cookie信息
})

// request 拦截器 发送数据到后台前拦截
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log("axios中request报错", error);
        Promise.reject(error);
    }
)

// Response 拦截器 获取后台数据前拦截器
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        console.log("axios中response报错", error);
        Promise.reject(error);
    }
)

export default service;