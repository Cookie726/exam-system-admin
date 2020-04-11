import {
    post
} from "../utils/request"
export const uploadImage = data => post("upload", data)