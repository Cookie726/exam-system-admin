import {
    get,
    post
} from "../utils/request"

export const getNewUserList = data => get("/administrator/getNewUserList", data)

export const passNewUser = data => post("/administrator/passNewUser", data)

export const refuseNewUser = data => post("/administrator/refuseNewUser", data)