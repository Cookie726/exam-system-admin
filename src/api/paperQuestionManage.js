import {
    get,
    put,
    post,
    onDelete
} from "../utils/request"



// 题库管理

export const getQuestionList = data => {
    return get("/question", data)
}

export const getQuestionDetail = (id) => {
    return get("/question/" + id)
}

export const addQuestion = (data) => {
    return put("/question", data)
    // data.id = Math.floor(Math.random() * 1000 + 100)
    // data.user = {
    //     userName: "潘炳名"
    // }
    // const res = {
    //     code: 0,
    //     msg: "",
    //     data
    // }
    // return Promise.resolve(res)
}

export const deleteQuestion = id => {
    return onDelete("/question/" + id)
}

// 试卷管理

export const getGrades = id => {
    return get("/paperInfo/gradesAnalysis/" + id)
}

export const getPaperList = (data) => {
    return get("/paperInfo", data)
}

export const getSubmitList = (id) => {
    return get("/paperInfo/submitList/" + id)
}

export const deletePaper = id => {
    return onDelete("/paperInfo/" + id)
}

export const addPaper = data => {
    return put("addPaper", data)
}

export const updatePaper = (id, data) => {
    return post("/paperInfo/" + id, data)
}

export const getPaperDetail = id => {
    return get('/paperInfo/info/' + id)
}

export const getExam = id => {
    return get("/paperInfo/" + id)
}

export const getRecord = data => get("/papermark/getrecord", data)