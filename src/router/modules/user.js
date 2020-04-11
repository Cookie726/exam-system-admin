import User from "../../views/user"
import UserStudent from "../../views/user/student"
import UserTeacher from "../../views/user/teacher"

export default [{
    path: "user",
    name: "user",
    component: User,
    redirect: "userTeacher",
    meta: {
        name: "用户管理"
    },
    children: [{
            path: "teacher",
            name: "userTeacher",
            component: UserTeacher,
            meta: {
                name: "教师管理"
            }
        },
        {
            path: "student",
            component: UserStudent,
            name: "userStudent",
            meta: {
                name: "学生管理"
            }
        }
    ]
}]