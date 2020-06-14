import {
    get
} from "@/utils/request"

export const getExamRecord = data => get("/record", data)

export const getRecordDetail = id => get("/record/detail/" + id)