import {
    post
} from "@/utils/request"

export const putAnswer = (data) => {
    return post("/exam/conserve", data)
}

export const submitAnswer = id => {
    return post("/exam/submit/" + id)
}