import {
    get,
    post
} from "../utils/request"

export const getNewUserList = data => get("/audit", data)

export const passNewUser = data => post("/audit", data)

export const refuseNewUser = data => post("/audit", data)