import {
    post
} from "@/utils/request"

export const getExamList = (data) => {
    console.log(data)
    return Promise.resolve({
        code: 0,
        msg: ""
    })
}

export const putAnswer = (data) => {
    return post("/exam/conserve", data)
}

export const putShortAnswer = data => {
    console.log(data)
    return Promise.resolve({
        code: 0,
        msg: ""
    })
}

export const startExam = id => {
    console.log(id)
    return Promise.resolve({
        code: 0,
        msg: ""
    })
}

export const submitAnswer = id => {
    return post("/exam/submit/" + id)
}