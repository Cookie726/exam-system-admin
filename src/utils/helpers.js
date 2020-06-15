export const isComplete = (type, newVal) => {
    if (!newVal) return false
    let val
    if (type === '简答题') {
        const reg = /<[^<>]+>/g
        val = newVal.replace(reg, "")
    } else if (type === '单选题' || type === '判断题') {
        val = newVal
    } else if (type === '多选题') {
        val = newVal.join("")
    }
    return val !== ""
}

export const formatDate = function (time) {
    let date = new Date(time);
    let YY = date.getFullYear() + '-';
    let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
}

export const getRoutes = (permissions, dynamicRoutes) => {
    dynamicRoutes[0].children = dynamicRoutes[0].children.filter(child => permissions.some(p => p.name === child.meta.name))
    dynamicRoutes.forEach(item => {
        if (item.name === "layout") {
            item.redirect = {
                name: item.children[0].name
            }
            return
        }
    })
    return dynamicRoutes
}

export const getSidebarList = (routerList) => {
    const res = []
    routerList.forEach(route => {
        const item = {
            name: route.meta.name,
            icon: route.meta.icon,
            moduleName: route.name
        }
        if (route.children) {
            item.children = getSidebarList(route.children)
        }
        res.push(item)
    })
    return res
}