import {
    post,
    get,
    put
} from "../utils/request"

export const signin = ({
    sno,
    password
}) => {
    return post("/login", {
        sno,
        password,
    })
}

export const signup = data => put("/register", data)

export const logout = () => get("/logout")