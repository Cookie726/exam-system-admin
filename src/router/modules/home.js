export default [{
    path: "home",
    name: "home",
    meta: {
        name: "考试中心",
        role: ["student"],
        icon: "home"
    },
    component: resolve => require(["@/views/home"], resolve)
}]