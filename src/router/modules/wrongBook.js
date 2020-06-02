export default [{
    path: "wrongBook",
    name: "wrongBook",
    meta: {
        name: "错题本",
        role: ["student"],
        icon: "home"
    },
    component: resolve => require(["@/views/wrongBook"], resolve)
}]