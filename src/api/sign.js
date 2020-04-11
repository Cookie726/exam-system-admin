import {
    post
} from "../utils/request"

export const signin = data => post("/User/login", data)

export const signup = data => post("/User/register", data)