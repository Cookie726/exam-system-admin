import {
    post
} from "../utils/request"

export const signin = data => post("/sign/login", data)

export const signup = data => post("/User/register", data)