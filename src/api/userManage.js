import {
    get,
    post
} from "@/utils/request"

export const getUserList = param => get("/user/list", param)

export const updateUserPower = data => post("/role/changeByIdList", data)

export const updateStatus = data => post("/user/changeStatus", data)