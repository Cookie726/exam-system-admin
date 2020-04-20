export default [{
    path: "addPaper",
    name: "addPaper",
    meta: {
        name: "添加试卷"
    },
    component: resolve => require(["../../views/addPaper"], resolve)
}]