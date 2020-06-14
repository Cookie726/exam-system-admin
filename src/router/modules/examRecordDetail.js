export default [{
    path: "examRecordDetail",
    name: "examRecordDetail",
    meta: {
        name: "答题详情",
        role: ["student"],
    },
    component: resolve => require(["@/views/examRecordDetail"], resolve)
}]