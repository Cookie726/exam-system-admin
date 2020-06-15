export default [{
    path: "user",
    name: "user",
    component: resolve => require(["@/views/user"], resolve),
    redirect: "userTeacher",
    meta: {
        name: "用户管理",
        icon: "user-manage"
    },
    children: [{
            path: "teacher",
            name: "userTeacher",
            component: resolve => require(["@/views/user/teacher"], resolve),
            meta: {
                name: "教师管理",
                icon: "teacher"
            }
        },
        {
            path: "student",
            component: resolve => require(["@/views/user/student"], resolve),
            name: "userStudent",
            meta: {
                name: "学生管理",
                icon: "student"
            }
        }
    ]
}]