import {
    get,
    post
} from "@/utils/request"

export const getUserList = param => get("/user", param)

export const updateUserPower = data => post("/user/changeRoleByIdList", data)

export const updateStatus = data => post("/user/changeStatus", data)