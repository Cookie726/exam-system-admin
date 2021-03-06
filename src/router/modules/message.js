export default [{
    path: "message",
    name: "message",
    component: resolve => require(["@/views/message"], resolve),
    redirect: "messageVerify",
    meta: {
        name: "消息中心",
        icon: "message-manage"
    },
    children: [{
            path: "verify",
            component: resolve => require(["@/views/message/verify"], resolve),
            name: "messageVerify",
            meta: {
                name: "注册审核",
                icon: "verify"
            }
        }
    ]
}]