import {
    get
} from "@/utils/request"

export const getStudentList = () => get("/addPaper/students")