import {
    get,
    put,
    post,
    onDelete
} from "../utils/request"



// 题库管理

export const getQuestionList = data => {
    console.log("ddd", data)
    return get("/question", data)
    // console.log(data)
    // return Promise.resolve({
    //     code: "",
    //     msg: "",
    //     data: {
    //         total: 10,
    //         questionList: [{
    //             id: 1,
    //             content: "12312阿斯蒂芬3",
    //             questionType: "单选题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 2,
    //             content: "123asdf123",
    //             questionType: "多选题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 3,
    //             content: "112323123",
    //             questionType: "判断题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 4,
    //             content: "123阿斯蒂芬123",
    //             questionType: "简答题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 5,
    //             content: "123123",
    //             questionType: "选择题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 6,
    //             content: "123123",
    //             questionType: "选择题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 7,
    //             content: "123123",
    //             questionType: "选择题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 8,
    //             content: "123123",
    //             questionType: "选择题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 9,
    //             content: "123123",
    //             questionType: "选择题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }, {
    //             id: 10,
    //             content: "123123",
    //             questionType: "选择题",
    //             user: {
    //                 userName: "潘炳名",
    //             },
    //             createTime: "2020/04/14 22:18:22",
    //         }]

    //     }
    // })
}

export const getQuestionDetail = (id) => {
    return get("/question/" + id)
    // console.log("查看题目详细信息：", id)
    // const questionDetailList = [{
    //     id: 4,
    //     content: "<p>这是题目</p>",
    //     questionType: "简答题",
    //     classify: "前端",
    //     createTime: "2020-05-21 18:05:23",
    //     user: {
    //         userName: "潘炳名",
    //     },
    //     analysis: "<p>这是解析</p>",
    //     value: 10,
    //     optionList: [{
    //         status: 1,
    //         choice: "<p>这是简答题答案</p>",
    //     }, ],
    // }, {
    //     id: 3,
    //     content: "<p>这是判断题题目</p>",
    //     questionType: "判断题",
    //     classify: "前端",
    //     createTime: "2020-05-21 18:05:23",
    //     user: {
    //         userName: "潘炳名",
    //     },
    //     analysis: "<p>这是解析</p>",
    //     value: 10,
    //     optionList: [{
    //         status: 1,
    //         choice: "正确",
    //     }, {
    //         status: 0,
    //         choice: "错误",
    //     }, ],
    // }, {
    //     id: 2,
    //     content: "<p>这是多选题题目</>",
    //     questionType: "多选题",
    //     classify: "前端",
    //     createTime: "2020-05-21 18:05:23",
    //     user: {
    //         userName: "潘炳名",
    //     },
    //     analysis: "<p>这是解析</p>",
    //     value: 10,
    //     optionList: [{
    //         status: 1,
    //         choice: "<p>这是第一个选项</p>",
    //     }, {
    //         status: 1,
    //         choice: "<p>这是第二个选项</p>",
    //     }, {
    //         status: 0,
    //         choice: "<p>这是第三个选项</p>",
    //     }, {
    //         status: 1,
    //         choice: "<p>这是第四个选项</p>",
    //     }, ],
    // }, {
    //     id: 1,
    //     content: "<p>这是单选题题目</p>",
    //     questionType: "单选题",
    //     classify: "前端",
    //     createTime: "2020-05-21 18:05:23",
    //     user: {
    //         userName: "潘炳名",
    //     },
    //     analysis: "<p>这是解析</p>",
    //     value: 10,
    //     optionList: [{
    //         status: 0,
    //         choice: "<p>这是第一个选项</p>",
    //     }, {
    //         status: 1,
    //         choice: "<p>这是第二个选项</p>",
    //     }, {
    //         status: 0,
    //         choice: "<p>这是第三个选项</p>",
    //     }, {
    //         status: 0,
    //         choice: "<p>这是第四个选项</p>",
    //     }, ],
    // }]
    // const detail = questionDetailList.find(q => q.id === id)
    // return Promise.resolve({
    //     code: 0,
    //     msg: "",
    //     data: detail
    // })
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
    return get("grades/analysis/" + id)
    // console.log("试卷的id:", id)
    // const res = {
    //     code: 0,
    //     msg: "",
    //     data: {
    //         paper: new Paper(1),
    //         studentList: [{
    //             student: new User(1, "坤坤"),
    //             score: 100,
    //             submitTime: "2020-05-23 20:26:00"
    //         }, {
    //             student: new User(2, "富贵"),
    //             score: 90,
    //             submitTime: "2020-05-23 20:26:00"
    //         }, {
    //             student: new User(3, "旺财"),
    //             score: 80,
    //             submitTime: "2020-05-23 20:26:00"
    //         }, {
    //             student: new User(4, "张三"),
    //             score: 63,
    //             submitTime: "2020-05-23 20:26:00"
    //         }, {
    //             student: new User(5, "小文"),
    //             score: 27,
    //             submitTime: "2020-05-23 20:26:00"
    //         }]
    //     }
    // }
    // return Promise.resolve(res)
}

export const getPaperList = (data) => {
    return get("/paperInfo", data)
    // console.log(data)
    // const res = {
    //     code: 0,
    //     msg: '',
    //     data: {
    //         total: 33,
    //         paperList: [
    //             new Paper(1),
    //             new Paper(2),
    //             new Paper(3),
    //             new Paper(4),
    //             new Paper(5),
    //             new Paper(6),
    //             new Paper(7),
    //             new Paper(8),
    //             new Paper(9),
    //             new Paper(10),
    //         ]
    //     }
    // };
    // return Promise.resolve(res);
}

export const getSubmitList = (id) => {
    return get("/submitList/" + id)
    // console.log("获取试卷提交列表id：", id)
    // const res = {
    //     code: 0,
    //     msg: "",
    //     data: [{
    //         user: new User(1, "坤坤"),
    //         isSubmit: 1,
    //         submitTime: "2020-05-24 13:14:00",
    //         isMark: 0
    //     }, {
    //         user: new User(2, "大根儿"),
    //         isSubmit: 0,
    //         submitTime: "2020-05-24 13:14:00",
    //         isMark: 0
    //     }, {
    //         user: new User(3, "富贵"),
    //         isSubmit: 1,
    //         submitTime: "2020-05-24 13:14:00",
    //         isMark: 1
    //     }, {
    //         user: new User(4, "丸子"),
    //         isSubmit: 0,
    //         submitTime: "2020-05-24 13:14:00",
    //         isMark: 0
    //     }, {
    //         user: new User(5, "四喜"),
    //         isSubmit: 1,
    //         submitTime: "2020-05-24 13:14:00",
    //         isMark: 0
    //     }, {
    //         user: new User(6, "汤圆"),
    //         isSubmit: 1,
    //         submitTime: "2020-05-24 13:14:00",
    //         isMark: 1
    //     }]
    // }
    // return Promise.resolve(res)
}

export const deletePaper = id => {
    return onDelete("/paperInfo/" + id)
}

export const addPaper = data => {
    return put("paperInfo", data)
}

export const updatePaper = (id, data) => {
    return post("/paperInfo/" + id, data)
}

export const getPaperDetail = id => {
    return get('/paperInfo/info/' + id)
}

export const getExam = id => {
    return get("/exam/" + id)
}