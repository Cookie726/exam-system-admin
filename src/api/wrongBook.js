import {
    get
} from "@/utils/request"

export const getWrongBook = data => get("/wrongbook", data)