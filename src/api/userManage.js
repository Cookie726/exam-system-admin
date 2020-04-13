import {
    get,
    post
} from "../utils/request"

export const getUserList = param => get("/administrator/findUser", param)

export const updateUserPower = data => get("/administrator/updateUserPower", data)

export const deleteUser = data => post("/administrator/deleteUser", data)

export const startUser = data => post("/administrator/startUser", data)