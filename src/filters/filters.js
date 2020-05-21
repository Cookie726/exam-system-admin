export const numberToLetter = num => {
    return String.fromCharCode(num + 65)
}

export const getStatusButton = status => {
    if (status === 1) {
        return "禁用"
    } else if (status === 2) {
        return "启用"
    }
}

export const getStatus = status => {
    if (status === 1) {
        return "已启用"
    } else if (status === 2) {
        return "已停用"
    }
}

export const getTotalScore = list => {
    let score = 0
    list.forEach(v => {
        score += v.score
    });
    return score
}

export const getRoleName = role => {
    if (role === 0) {
        return "学生"
    } else if (role === 1) {
        return "教师"
    }
}

export const getSubmitTag = isSubmit => {
    if (isSubmit === 1) {
        return "已提交"
    } else {
        return "未提交"
    }
}

export const getMarkText = isMark => {
    if (isMark === 1) {
        return "已判卷"
    } else {
        return "判卷"
    }
}