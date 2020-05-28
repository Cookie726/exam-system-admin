export default [{
    path: "addPaper",
    name: "addPaper",
    meta: {
        name: "添加试卷",
        role: ["admin", "teacher"]
    },
    component: resolve => require(["../../views/addPaper"], resolve)
}]