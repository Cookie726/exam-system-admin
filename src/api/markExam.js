import {
    post
} from "../utils/request";

export const markExam = data => post("/papermark/submit", data)