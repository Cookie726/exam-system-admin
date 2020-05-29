import Message from "../../views/message";
import MessageVerify from "../../views/message/verify";

export default [{
    path: "message",
    name: "message",
    component: Message,
    redirect: "messageVerify",
    meta: {
        name: "消息中心",
        role: ["admin"],
        icon: "1"
    },
    children: [{
            path: "verify",
            component: MessageVerify,
            name: "messageVerify",
            meta: {
                name: "注册审核",
                role: ["admin"],
                icon: "1"
            }
        }
    ]
}]