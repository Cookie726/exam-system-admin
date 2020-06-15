import store from "@/store";
import axios from "axios"
export const baseURL = "http://192.144.227.168:8086"
const service = axios.create({
    baseURL,
    timeout: 8000,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json; charset=utf-8',
    }
})

service.interceptors.response.use(
    response => {
        const code = response.data.code
        if (code === -1) {
            store.commit("user/LOGOUT");
            window.location.reload();
        } else if (code === -2) {
            window.ELEMENT.Message.error("权限不足")
        }
        return response
    },
    err => {
        return Promise.reject(err)
    }
)

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

export function put(url, params) {
    return new Promise((resolve, reject) => {
        service.put(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export function onDelete(url) {
    return new Promise((resolve, reject) => {
        service.delete(url)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}