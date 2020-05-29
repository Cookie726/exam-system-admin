export default [{
    path: "addPaper",
    name: "addPaper",
    meta: {
        name: "添加试卷",
        role: ["admin", "teacher"],
        icon: "1"
    },
    component: resolve => require(["../../views/addPaper"], resolve)
}]