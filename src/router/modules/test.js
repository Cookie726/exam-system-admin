import Test from "../../views/test"
import TestPaper from "../../views/test/paper"
import TestQuestion from "../../views/test/question"

export default [{
    path: "test",
    name: "test",
    meta: {
        name: "卷题管理",
        role: ["admin", "teacher"],
        icon: "1"
    },
    redirect: "testPaper",
    component: Test,
    children: [{
            path: "paper",
            name: "testPaper",
            component: TestPaper,
            meta: {
                name: "试卷管理",
                role: ["admin", "teacher"],
                icon: "1"
            }
        },
        {
            path: "question",
            name: "testQuestion",
            component: TestQuestion,
            meta: {
                name: "题库管理",
                role: ["admin", "teacher"],
                icon: "1"
            }
        }
    ]
}]