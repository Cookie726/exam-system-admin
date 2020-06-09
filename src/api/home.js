import {
    get
} from "@/utils/request"

export const getExamList = data => {
    return get("/exam", data)
}

export const getPaperInfo = id => {
    return get("/exam/" + id)
}