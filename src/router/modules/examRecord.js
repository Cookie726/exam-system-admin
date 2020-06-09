export default [{
    path: "examRecord",
    name: "examRecord",
    meta: {
        name: "考试记录",
        role: ["student"],
        icon: "home"
    },
    component: resolve => require(["@/views/examRecord"], resolve)
}]