export const initAnswerType = (type) => {
    if (type === "单选题" || type === "判断题") {
        return null
    } else if (type === "多选题") {
        return []
    }
}