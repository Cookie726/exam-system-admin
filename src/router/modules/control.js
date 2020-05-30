export default [{
    path: "control",
    name: "control",
    meta: {
        name: "控制台",
        role: ["admin", "teacher", "student"],
        icon: "1"
    },
    component: resolve => require(["@/views/control"], resolve)
}]