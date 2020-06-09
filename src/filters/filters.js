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

export const getRoleName = roles => {
    if (roles[0].name === 'teacher') {
        return '教师'
    } else if (roles[0].name === 'student') {
        return '学生'
    } else if (roles[0].name === 'admin') {
        return '管理员'
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

export const getText = html => {
    html = html.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    html = html.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    html = html.replace(/&nbsp;/ig, ''); //去掉&nbsp;
    return html;
}