import {
    get
} from "@/utils/request"

export const getExamRecord = data => {
    return get("/record", data)
}