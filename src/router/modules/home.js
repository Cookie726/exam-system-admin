export default [{
    path: "home",
    name: "home",
    meta: {
        name: "考试中心",
        role: ["student"]
    },
    component: resolve => require(["@/views/home"], resolve)
}]