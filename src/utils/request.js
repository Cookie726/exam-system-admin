import axios from "axios"
// import {
//     Message,
//     MessageBox
// } from "element-ui"
// axios.defaults.baseURL = 'http://182.92.4.123/examSystem'
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
const service = axios.create({
    baseURL: "http://localhost:9527",
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json;charset=UTF-8'
    }
})

// service.interceptors.response.use(
//     response => {
//         const res = response.data
//         const code = res.code
//         if (code === 0) {
//             return res
//         } else if (code > 0 && code < 2000) {
//             if (code === 1004) {
//                 Message({
//                     message: "空数据",
//                     type: "info"
//                 })
//             } else if (code === 1003) {
//                 Message({
//                         message: "新密码和原密码相同",
//                         type: "error"
//                 })
//             } else {
//                 return res
//             }
//         } else if(code>=2000) {
//             if(code===2000) {
//                 Message({
//                     message: "用户名或密码错误",
//                     type: "error"
//                 })
//             } else if(code === 2001) {
//                 Message({
//                     message: "参数为空",
//                     type: "warning"
//                 })
//             }
//         }
//     }
// )

export function post(url, params) {
    return new Promise((resolve, reject) => {
        service.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export function get(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}