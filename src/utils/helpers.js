export const initAnswerType = (type) => {
    if (type === "单选题" || type === "判断题") {
        return null
    } else if (type === "多选题") {
        return []
    }
}

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