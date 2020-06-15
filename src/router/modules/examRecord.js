export default [{
    path: "examRecord",
    name: "examRecord",
    meta: {
        name: "考试记录",
        icon: "home"
    },
    component: resolve => require(["@/views/examRecord"], resolve)
}]